import * as didJWT from "did-jwt";
import { DIDResolutionResult } from "did-resolver";
import {
  AlsoKnownAs,
  Castor,
  Controller,
  Services,
  VerificationMethods,
  DID,
} from "domain/index.js";

export class JWT {
  private castor: Castor;

  constructor(castor: Castor) {
    this.castor = castor;
  }

  private async resolve(did: string): Promise<DIDResolutionResult> {
    const resolved = await this.castor.resolveDID(did);
    const alsoKnownAs = resolved.coreProperties.find(
      (prop): prop is AlsoKnownAs => prop instanceof AlsoKnownAs
    );
    const controller = resolved.coreProperties.find(
      (prop): prop is Controller => prop instanceof Controller
    );
    const verificationMethods = resolved.coreProperties.find(
      (prop): prop is VerificationMethods => prop instanceof VerificationMethods
    );
    const service = resolved.coreProperties.find(
      (prop): prop is Services => prop instanceof Services
    );

    return {
      didResolutionMetadata: { contentType: "application/did+ld+json" },
      didDocumentMetadata: {},
      didDocument: {
        id: resolved.id.toString(),
        alsoKnownAs: alsoKnownAs && alsoKnownAs.values,
        controller:
          controller && controller.values
            ? controller.values.map((v) => v.toString())
            : [],
        verificationMethod:
          verificationMethods && verificationMethods.values
            ? verificationMethods.values.map((vm) => {
                if (vm.publicKeyMultibase) {
                  return {
                    id: vm.id,
                    type: "EcdsaSecp256k1VerificationKey2019",
                    controller: vm.controller,
                    publicKeyMultibase: vm.publicKeyMultibase,
                  };
                }
                if (vm.publicKeyJwk) {
                  return {
                    id: vm.id,
                    type: "JsonWebKey2020",
                    controller: vm.controller,
                    publicKeyJwk: vm.publicKeyJwk,
                  };
                }
                throw new Error("Invalid KeyType");
              })
            : [],
        service:
          service && service.values
            ? service.values.map((service) => {
                return {
                  id: service.id,
                  type: service.type[0],
                  serviceEndpoint: service.serviceEndpoint,
                };
              })
            : [],
      },
    };
  }

  async sign(
    issuer: DID,
    privateKey: Uint8Array,
    payload: Partial<didJWT.JWTPayload>
  ): Promise<string> {
    //TODO: Better check if this method is called with PrismDID and not PeerDID or other
    const signer = didJWT.ES256KSigner(privateKey);
    const jwt = await didJWT.createJWT(
      payload,
      { issuer: issuer.toString(), signer },
      { alg: "ES256K" }
    );
    return jwt;
  }
}
