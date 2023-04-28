/* eslint-disable @typescript-eslint/no-unused-vars */
import { SHA256 } from "@stablelib/sha256";
import { base64url } from "multiformats/bases/base64";

import {
  Apollo,
  Castor as CastorInterface,
  CastorError,
  DID,
  PublicKey,
  Service,
  KeyPair,
  DIDDocument,
  PrismDIDMethodId,
  DIDDocumentCoreProperty,
  DIDResolver,
  Curve,
  VerificationMethod as DIDDocumentVerificationMethod,
  VerificationMethods as DIDDocumentVerificationMethods
} from "domain/index.js";
import {
  getUsageId,
  PrismDIDPublicKey,
  Usage,
} from "./did/prismDID/PrismDIDPublicKey.js";
import * as DIDParser from "./parser/DIDParser.js";
import * as Protos from "./protos/node_models.js";
import { PeerDIDResolver } from "./resolver/PeerDIDResolver.js";
import { PeerDIDCreate } from "../peer-did/PeerDIDCreate.js";
import { LongFormPrismDIDResolver } from "./resolver/LongFormPrismDIDResolver.js";
import * as base64 from "multiformats/bases/base64";
import * as base58 from "multiformats/bases/base58";
import { JWKHelper } from "../peer-did/helpers/JWKHelper.js";
import {
  VerificationMaterialAgreement,
  VerificationMaterialAuthentication,
  VerificationMaterialFormatPeerDID,
  VerificationMethodTypeAgreement,
  VerificationMethodTypeAuthentication,
} from "../peer-did/types.js";
import { Secp256k1PublicKey } from "../apollo/utils/Secp256k1PublicKey.js";
export default class Castor implements CastorInterface {
  private apollo: Apollo;
  private resolvers: DIDResolver[];

  constructor(apollo: Apollo) {
    this.apollo = apollo;
    this.resolvers = [
      new PeerDIDResolver(),
      new LongFormPrismDIDResolver(this.apollo),
    ];
  }

  parseDID(did: string): DID {
    return DIDParser.parse(did);
  }

  async createPrismDID(
    masterPublicKey: PublicKey,
    services?: Service[] | undefined
  ): Promise<DID> {
    const publicKey = new PrismDIDPublicKey(
      getUsageId(Usage.MASTER_KEY),
      Usage.MASTER_KEY,
      masterPublicKey
    );
    const authenticateKey = new PrismDIDPublicKey(
      getUsageId(Usage.AUTHENTICATION_KEY),
      Usage.AUTHENTICATION_KEY,
      masterPublicKey
    );
    const didCreationData =
      new Protos.io.iohk.atala.prism.protos.CreateDIDOperation.DIDCreationData({
        public_keys: [authenticateKey.toProto(), publicKey.toProto()],
        services: services?.map((service) => {
          return new Protos.io.iohk.atala.prism.protos.Service({
            service_endpoint: [service.serviceEndpoint.uri],
            id: service.id,
            type: service.type[0],
          });
        }),
      });

    const didOperation =
      new Protos.io.iohk.atala.prism.protos.CreateDIDOperation({
        did_data: didCreationData,
      });

    const operation = new Protos.io.iohk.atala.prism.protos.AtalaOperation({
      create_did: didOperation,
    });

    const encodedState = operation.serializeBinary();
    const sha256 = new SHA256();
    const stateHash = Buffer.from(
      sha256.update(encodedState).digest()
    ).toString("hex");

    const base64State = base64.base64url.baseEncode(encodedState);

    const methodSpecificId = new PrismDIDMethodId([stateHash, base64State]);

    return new DID("did", "prism", methodSpecificId.toString());
  }

  async createPeerDID(keyPairs: KeyPair[], services: Service[]): Promise<DID> {
    const peerDIDOperation = new PeerDIDCreate();
    const peerDID = peerDIDOperation.createPeerDID(keyPairs, services);
    return peerDID.did;
  }

  async resolveDID(did: string): Promise<DIDDocument> {
    const parsed = DID.fromString(did);
    const resolver = this.resolvers.find(
      (resolver) => resolver.method === parsed.method
    );
    if (!resolver) {
      throw new CastorError.NotPossibleToResolveDID();
    }
    return resolver.resolve(did);
  }

  private extractVerificationMethods(
    coreProperties: DIDDocumentCoreProperty[]
  ): DIDDocumentVerificationMethod[] {
    return coreProperties.reduce<DIDDocumentVerificationMethod[]>(
      (result, property) => {
        if (property instanceof DIDDocumentVerificationMethods) {
          result.push(...property.values);
        }
        return result;
      },
      []
    );
  }

  async verifySignature(
    did: DID,
    challenge: Uint8Array,
    signature: Uint8Array
  ): Promise<boolean> {
    const didDocument = await this.resolveDID(did.toString());
    const verificationMethods = this.extractVerificationMethods(
      didDocument.coreProperties
    );
    let publicKey: PublicKey;

    if (did.method == "prism") {
      const methods = verificationMethods.filter(
        (method) => method.type == Curve.SECP256K1
      );
      if (methods.length <= 0) {
        throw new Error("No verification methods for Prism DID");
      }
      for (const method of methods) {
        if (!method.publicKeyMultibase) {
          throw new Error(
            "PrismDID VerificationMethod does not have multibase Key in it"
          );
        }

        const publicKeyEncoded = Secp256k1PublicKey.secp256k1FromBytes(
          Buffer.from(base58.base58btc.decode(method.publicKeyMultibase))
        ).getEncoded();

        publicKey = {
          keyCurve: {
            curve: Curve.SECP256K1,
          },
          value: publicKeyEncoded,
        };
        if (this.apollo.verifySignature(publicKey, challenge, signature)) {
          return true;
        }
      }
    } else if (did.method == "peer") {
      const methods = verificationMethods.filter(({ publicKeyJwk }) => {
        if (!publicKeyJwk) return false;
        return publicKeyJwk.crv === Curve.ED25519;
      });
      if (methods.length <= 0) {
        throw new Error("No verification methods for Peer DID");
      }
      for (const method of methods) {
        if (!method.publicKeyJwk) {
          throw new Error(
            "PeerDID VerificationMethod does not have jwk Key in it"
          );
        }
        const material =
          method.publicKeyJwk.crv === Curve.X25519
            ? new VerificationMaterialAgreement(
                JSON.stringify(method.publicKeyJwk),
                VerificationMethodTypeAgreement.JSON_WEB_KEY_2020,
                VerificationMaterialFormatPeerDID.JWK
              )
            : new VerificationMaterialAuthentication(
                JSON.stringify(method.publicKeyJwk),
                VerificationMethodTypeAuthentication.JSON_WEB_KEY_2020,
                VerificationMaterialFormatPeerDID.JWK
              );

        const decodedKey =
          method.publicKeyJwk.crv === Curve.X25519
            ? JWKHelper.fromJWKAgreement(
                material as VerificationMaterialAgreement
              )
            : JWKHelper.fromJWKAuthentication(
                material as VerificationMaterialAuthentication
              );

        publicKey = {
          keyCurve: {
            curve: method.publicKeyJwk.crv as Curve,
          },
          value: Buffer.from(base64url.baseEncode(decodedKey)),
        };
        if (this.apollo.verifySignature(publicKey, challenge, signature)) {
          return true;
        }
      }
    } else {
      throw new Error("Did not supported");
    }

    return false;
  }

  getEcnumbasis(did: DID, keyPair: KeyPair): string {
    return new PeerDIDCreate().computeEncnumbasis(did, keyPair);
  }
}
