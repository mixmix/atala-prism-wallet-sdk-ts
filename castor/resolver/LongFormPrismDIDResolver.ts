import {SHA256} from "@stablelib/sha256";
import {CastorError} from "../../domain/models/Errors";
import Apollo from "../../domain/buildingBlocks/Apollo";
import {LongFormPrismDID} from "../../castor/did/prismDID/LongFormPrismDID";
import {
  Authentication as DIDDocumentAuthentication,
  Curve,
  DID,
  DIDDocument,
  DIDDocumentCoreProperty,
  DIDResolver,
  DIDUrl,
  Service as DIDDocumentService,
  ServiceEndpoint as DIDDocumentServiceEndpoint,
  Services as DIDDocumentServices,
  VerificationMethod as DIDDocumentVerificationMethod,
  VerificationMethods as DIDDocumentVerificationMethods,
} from "../../domain/models";

import * as DIDParser from "../parser/DIDParser";
import * as Protos from "../../castor/protos/node_models";
import {getUsage, getUsageId, PrismDIDPublicKey,} from "../../castor/did/prismDID/PrismDIDPublicKey";
import * as base64 from "multiformats/bases/base64";

export class LongFormPrismDIDResolver implements DIDResolver {
  method = "prism";

  constructor(private apollo: Apollo) {
  }

  async resolve(didString: string): Promise<DIDDocument> {
    const did = DIDParser.parse(didString);
    const prismDID = new LongFormPrismDID(did);
    const state = prismDID.encodedState;
    const base64State = base64.base64url.decode(`u${state}`);
    const [verificationMethods, services] = this.decodeState(
        did,
        prismDID.stateHash,
        base64State
    );
    const servicesProperty = new DIDDocumentServices(services);
    const verificationMethodsProperty = new DIDDocumentVerificationMethods([
      ...verificationMethods.values(),
    ]);
    const coreProperties: DIDDocumentCoreProperty[] = [];
    const authenticate: DIDDocumentAuthentication[] = [];

    for (const [key, value] of verificationMethods) {
      authenticate.push(new DIDDocumentAuthentication([key], [value]));
    }

    coreProperties.push(...authenticate);
    coreProperties.push(servicesProperty);
    coreProperties.push(verificationMethodsProperty);

    return new DIDDocument(did, coreProperties);
  }

  private decodeState(
      did: DID,
      stateHash: string,
      encodedData: Uint8Array
  ): [Map<string, DIDDocumentVerificationMethod>, DIDDocumentService[]] {
    try {
      const verifyEncodedState = new SHA256().update(encodedData).digest();
      const verifyEncodedStateHex = verifyEncodedState;

      if (
          Buffer.from(verifyEncodedState).toString("hex") !==
          Buffer.from(verifyEncodedStateHex).toString("hex")
      ) {
        throw new CastorError.InitialStateOfDIDChanged();
      }
      const operation =
          Protos.io.iohk.atala.prism.protos.AtalaOperation.deserializeBinary(
              encodedData
          );

      const publicKeys: PrismDIDPublicKey[] =
          operation.create_did?.did_data?.public_keys?.map(
              (key: Protos.io.iohk.atala.prism.protos.PublicKey) => {
                let value: Uint8Array;
                switch (key.has_compressed_ec_key_data) {
                  case false:
                    value = Uint8Array.from([0x04, ...key.ec_key_data.x, ...key.ec_key_data.y]);
                    break;
                  case true:
                    value = key.compressed_ec_key_data.data;
                    break;
                }

                return new PrismDIDPublicKey(
                    this.apollo,
                    getUsageId(getUsage(key.usage)),
                    getUsage(key.usage),
                    {
                      keyCurve: {
                        curve: Curve.SECP256K1,
                      },
                      value,
                    }
                );
              }
          ) || [];

      const services =
          operation.create_did?.did_data?.services?.map(
              (service: Protos.io.iohk.atala.prism.protos.Service) => {
                return new DIDDocumentService(
                    service.id,
                    [service.type],
                    new DIDDocumentServiceEndpoint(service.service_endpoint[0])
                );
              }
          ) || [];

      const verificationMethods = publicKeys.reduce(
          (partialResult, publicKey) => {
            /**
             * TODO: Support keys in multiple formats, right now its multibase
             */
            const didUrl = new DIDUrl(did, [], new Map(), publicKey.id);
            const method = new DIDDocumentVerificationMethod(
                didUrl.string(),
                did.toString(),
                publicKey.keyData.keyCurve.curve,
                undefined,
                base64.base64.encode(publicKey.keyData.value)
            );
            partialResult.set(didUrl.string(), method);
            return partialResult;
          },
          new Map<string, DIDDocumentVerificationMethod>()
      );

      return [verificationMethods, services];
    } catch (err) {
      throw new CastorError.InitialStateOfDIDChanged();
    }
  }
}
