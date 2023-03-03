"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PeerDIDResolver = void 0;
const Errors_1 = require("../../domain/models/Errors");
const Multicodec_1 = require("../../peer-did/helpers/Multicodec");
const PeerDID_1 = require("../../peer-did/PeerDID");
const types_1 = require("../../peer-did/types");
const base58_1 = require("multiformats/bases/base58");
const models_1 = require("../../domain/models");
const JWKHelper_1 = require("../../peer-did/helpers/JWKHelper");
class PeerDIDResolver {
    method = "peer";
    async resolve(didString) {
        const did = models_1.DID.fromString(didString);
        if (did.method !== "peer" || did.methodId.slice(0, 1) !== "2") {
            throw new Errors_1.CastorError.NotPossibleToResolveDID();
        }
        return this.buildDIDDocumentAlgo2(did, types_1.VerificationMaterialFormatPeerDID.JWK);
    }
    buildDIDDocumentAlgo2(did, format) {
        const composition = did.methodId.split(".").slice(1);
        const authenticationMethods = [];
        const keyAgreementMethods = [];
        const services = [];
        composition.forEach((part) => {
            let decoded;
            const type = part.slice(0, 1);
            switch (type) {
                case types_1.Numalgo2Prefix.authentication:
                    decoded = this.decodeMultibaseEncnumbasisAuth(part.slice(1), format);
                    authenticationMethods.push(this.getVerificationMethod(did, decoded));
                    break;
                case types_1.Numalgo2Prefix.keyAgreement:
                    decoded = this.decodeMultibaseEcnumbasisAgreement(part.slice(1), format);
                    keyAgreementMethods.push(this.getVerificationMethod(did, decoded));
                    break;
                case types_1.Numalgo2Prefix.service:
                    services.push(...this.decodeService(did, part.slice(1)));
                    break;
            }
        });
        return new models_1.DIDDocument(did, [
            new models_1.VerificationMethods([
                ...authenticationMethods,
                ...keyAgreementMethods,
            ]),
            new models_1.Authentication(authenticationMethods.map(({ id }) => id), []),
            new models_1.KeyAgreement(keyAgreementMethods.map(({ id }) => id), []),
            new models_1.Services(services),
        ]);
    }
    decodeMultibaseEncnumbasisAuth(multibase, format) {
        const [decoded, verMaterial] = this.decodeMultibaseEncnumbasis(multibase, format, Multicodec_1.Codec.ed25519);
        if (!(verMaterial instanceof types_1.VerificationMaterialAuthentication) ||
            !verMaterial.authentication) {
            throw new Errors_1.CastorError.NotPossibleToResolveDID();
        }
        return [decoded, verMaterial.authentication];
    }
    decodeMultibaseEcnumbasisAgreement(multibase, format) {
        const [decoded, verMaterial] = this.decodeMultibaseEncnumbasis(multibase, format, Multicodec_1.Codec.x25519);
        if (!(verMaterial instanceof types_1.VerificationMaterialAgreement) ||
            !verMaterial.agreement) {
            throw new Errors_1.CastorError.NotPossibleToResolveDID();
        }
        return [decoded, verMaterial.agreement];
    }
    decodeMultibaseEncnumbasis(multibase, format, defaultCodec) {
        const [encnum, encnumData] = this.fromBase58Multibase(multibase);
        const [codec, decodedEncnum] = new Multicodec_1.MultiCodec(encnumData).decode(defaultCodec);
        this.validateRawKeyLength(decodedEncnum);
        if (format !== types_1.VerificationMaterialFormatPeerDID.JWK) {
            throw new Error("Not implemented");
        }
        if (codec === Multicodec_1.Codec.x25519) {
            try {
                const jwkJsonString = JWKHelper_1.JWKHelper.toJWK(decodedEncnum, types_1.VerificationMethodTypeAgreement.JSON_WEB_KEY_2020);
                return [
                    encnum,
                    new types_1.VerificationMaterialAgreement(jwkJsonString, types_1.VerificationMethodTypeAgreement.JSON_WEB_KEY_2020, format),
                ];
            }
            catch (err) {
                throw new Errors_1.CastorError.InvalidJWKKeysError();
            }
        }
        else if (codec === Multicodec_1.Codec.ed25519) {
            try {
                const jwkJsonString = JWKHelper_1.JWKHelper.toJWK(decodedEncnum, types_1.VerificationMethodTypeAuthentication.JSON_WEB_KEY_2020);
                return [
                    encnum,
                    new types_1.VerificationMaterialAuthentication(jwkJsonString, types_1.VerificationMethodTypeAuthentication.JSON_WEB_KEY_2020, format),
                ];
            }
            catch (err) {
                throw new Errors_1.CastorError.InvalidJWKKeysError();
            }
        }
        throw new Error("Not implemented");
    }
    fromBase58Multibase(multibase) {
        const multibaseDecoded = base58_1.base58btc.decode(multibase);
        return [multibase.slice(1), multibaseDecoded];
    }
    getVerificationMethod(did, decodedEncnumbasis) {
        const jsonObject = JSON.parse(decodedEncnumbasis[1].value);
        jsonObject["kid"] = did.toString() + "#" + decodedEncnumbasis[0];
        return {
            id: new models_1.DIDUrl(did, [], new Map(), decodedEncnumbasis[0]).string(),
            controller: did.toString(),
            type: decodedEncnumbasis[1].keyType.value,
            publicKeyJwk: jsonObject,
        };
    }
    decodeService(did, encodedString) {
        let jsonData;
        try {
            jsonData = Buffer.from(encodedString, "base64url");
            const serviceList = JSON.parse(jsonData.toString());
            const services = (Array.isArray(serviceList) ? serviceList : [serviceList]).map((service) => PeerDID_1.PeerDIDService.decode(service));
            return services.map((service, offset) => {
                return new models_1.Service(did.toString() + service.type + "-" + offset, [service.type], new models_1.ServiceEndpoint(service.serviceEndpoint, service.accept, service.routingKeys));
            });
        }
        catch (e) {
            throw new Errors_1.CastorError.NotPossibleToResolveDID();
        }
    }
    validateRawKeyLength(key) {
        if (key.length !== 32) {
            throw new Errors_1.CastorError.InvalidKeyError();
        }
    }
}
exports.PeerDIDResolver = PeerDIDResolver;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGVlckRJRFJlc29sdmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Nhc3Rvci9yZXNvbHZlci9QZWVyRElEUmVzb2x2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsdURBQXlEO0FBQ3pELGtFQUFzRTtBQUN0RSxvREFBd0Q7QUFDeEQsZ0RBUThCO0FBQzlCLHNEQUFzRDtBQUV0RCxnREFZNkI7QUFDN0IsZ0VBQTZEO0FBRTdELE1BQWEsZUFBZTtJQUMxQixNQUFNLEdBQUcsTUFBTSxDQUFDO0lBRWhCLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBaUI7UUFDN0IsTUFBTSxHQUFHLEdBQUcsWUFBRyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN0QyxJQUFJLEdBQUcsQ0FBQyxNQUFNLEtBQUssTUFBTSxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUU7WUFDN0QsTUFBTSxJQUFJLG9CQUFXLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztTQUNqRDtRQUNELE9BQU8sSUFBSSxDQUFDLHFCQUFxQixDQUMvQixHQUFHLEVBQ0gseUNBQWlDLENBQUMsR0FBRyxDQUN0QyxDQUFDO0lBQ0osQ0FBQztJQUVPLHFCQUFxQixDQUMzQixHQUFRLEVBQ1IsTUFBeUM7UUFFekMsTUFBTSxXQUFXLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JELE1BQU0scUJBQXFCLEdBQXlCLEVBQUUsQ0FBQztRQUN2RCxNQUFNLG1CQUFtQixHQUF5QixFQUFFLENBQUM7UUFDckQsTUFBTSxRQUFRLEdBQXlCLEVBQUUsQ0FBQztRQUUxQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDM0IsSUFBSSxPQUdILENBQUM7WUFD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