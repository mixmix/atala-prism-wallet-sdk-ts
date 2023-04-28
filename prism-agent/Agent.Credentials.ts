import { JWT } from "apollo/utils/jwt/JWT.js";
import {
  Apollo,
  Castor,
  Pluto,
  Pollux,
  AgentError,
  AttachmentBase64,
  AttachmentDescriptor,
  AttachmentJsonData,
  Curve,
  Seed,
  VerifiableCredential
} from "domain/index.js";
import { OfferCredential } from "./protocols/issueCredential/OfferCredential.js";
import {
  createRequestCredentialBody,
  RequestCredential,
} from "./protocols/issueCredential/RequestCredential.js";
import { AgentCredentials as AgentCredentialsClass } from "./types/index.js";
import { base64, base64url } from "multiformats/bases/base64";
import { IssueCredential } from "./protocols/issueCredential/IssueCredential.js";
import {
  createPresentationBody,
  Presentation,
} from "./protocols/proofPresentation/Presentation.js";
import { RequestPresentation } from "./protocols/proofPresentation/RequestPresentation.js";

export class AgentCredentials implements AgentCredentialsClass {
  constructor(
    protected apollo: Apollo,
    protected castor: Castor,
    protected pluto: Pluto,
    protected pollux: Pollux,
    protected seed: Seed
  ) {}

  async verifiableCredentials(): Promise<VerifiableCredential[]> {
    return await this.pluto.getAllCredentials();
  }

  async processIssuedCredentialMessage(
    message: IssueCredential
  ): Promise<VerifiableCredential> {
    const attachment = message.attachments && message.attachments[0].data;
    if (!attachment) {
      throw new Error("No attachment");
    }
    const jwtData = base64url.baseDecode(
      (attachment as AttachmentBase64).base64
    );

    const credential = this.pollux.parseVerifiableCredential(
      Buffer.from(jwtData).toString()
    );

    await this.pluto.storeCredential(credential);

    return credential;
  }

  private extractDomainChallenge(attachments: AttachmentDescriptor[]) {
    return attachments.reduce(
      (_, attachment: any) => ({
        challenge: attachment?.data?.data?.options?.challenge,
        domain: attachment?.data?.data?.options?.domain,
      }),
      { challenge: undefined, domain: undefined } as {
        challenge?: string;
        domain?: string;
      }
    );
  }
  async prepareRequestCredentialWithIssuer(
    offer: OfferCredential
  ): Promise<RequestCredential> {
    const keyIndex = (await this.pluto.getPrismLastKeyPathIndex()) || 0;
    const keyPair = await this.apollo.createKeyPairFromKeyCurve(
      {
        curve: Curve.SECP256K1,
        index: keyIndex,
      },
      this.seed
    );
    const did = await this.castor.createPrismDID(keyPair.publicKey);

    await this.pluto.storePrismDID(
      did,
      keyIndex,
      {
        keyCurve: keyPair.privateKey.keyCurve,
        value: Buffer.from(base64url.baseEncode(keyPair.privateKey.value)),
      },
      null,
      did.toString()
    );
    const attachment = this.extractDomainChallenge(offer.attachments);

    const jwt = new JWT(this.castor);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const challenge = attachment.challenge!;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const domain = attachment.domain!;
    const signedJWT = await jwt.sign(did, keyPair.privateKey.value, {
      aud: domain,
      nonce: challenge,
      vp: {
        "@context": ["https://www.w3.org/2018/presentations/v1"],
        type: ["VerifiablePresentation"],
      },
    });
    const requestCredentialBody = createRequestCredentialBody(
      offer.body.formats,
      offer.body.goalCode,
      offer.body.comment
    );

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const from = offer.to!;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const to = offer.from!;
    const thid = offer.thid;
    const requestCredential = new RequestCredential(
      requestCredentialBody,
      [
        new AttachmentDescriptor(
          {
            base64: base64.baseEncode(Buffer.from(signedJWT)),
          },
          "prism/jwt"
        ),
      ],
      from,
      to,
      thid
    );
    return requestCredential;
  }

  async createPresentationForRequestProof(
    request: RequestPresentation,
    credential: VerifiableCredential
  ): Promise<Presentation> {
    const requestData = request.attachments.find(
      (attachment) =>
        attachment &&
        attachment.data &&
        (attachment.data as AttachmentJsonData).data
    );
    if (!requestData) {
      throw new AgentError.OfferDoesntProvideEnoughInformation();
    }
    //TODO: Improve attributes in Request & AttachmentData
    const data = requestData.data as any;
    const jsonObject = data.data;

    const options = jsonObject.options;

    const challenge = options.challenge;
    const domain = options.domain;
    const subjectDID = credential.subject;
    if (!subjectDID) {
      throw new Error("Credential subject not found");
    }

    const prismPrivateKey = await this.pluto.getDIDPrivateKeysByDID(subjectDID);

    if (!prismPrivateKey || prismPrivateKey.length <= 0) {
      throw new Error("DID PrivateKeys not found");
    }

    const jwt = new JWT(this.castor);
    //TODO: type safe this
    const originalJWTString = (credential as any).originalJWTString;

    const didInfo = await this.pluto.getDIDInfoByDID(subjectDID);
    if (!didInfo) {
      throw new Error("DID not found");
    }

    const signedJWT = await jwt.sign(
      didInfo.did,
      base64url.baseDecode(Buffer.from(prismPrivateKey[0].value).toString()),
      {
        iss: didInfo.did.toString(),
        aud: domain,
        nonce: challenge,
        vp: {
          "@context": ["https://www.w3.org/2018/presentations/v1"],
          type: ["VerifiablePresentation"],
          verifiableCredential: [originalJWTString],
        },
      }
    );

    const base64JWT = base64.baseEncode(Buffer.from(signedJWT));
    const presentationBody = createPresentationBody(
      request.body.goalCode,
      request.body.comment
    );

    const presentation = new Presentation(
      presentationBody,
      [
        new AttachmentDescriptor(
          {
            base64: base64JWT,
          },
          "prism/jwt"
        ),
      ],
      request.to,
      request.from,
      request.thid
    );

    return presentation;
  }
}
