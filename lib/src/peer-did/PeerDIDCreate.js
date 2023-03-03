"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PeerDIDCreate = void 0;
const models_1 = require("../domain/models");
const Errors_1 = require("../domain/models/Errors");
const JWKHelper_1 = require("./helpers/JWKHelper");
const Multicodec_1 = require("./helpers/Multicodec");
const PeerDID_1 = require("./PeerDID");
const types_1 = require("./types");
const base58_1 = require("multiformats/bases/base58");
class PeerDIDCreate {
    createPeerDID(keyPairs, services) {
        const signingKeys = keyPairs
            .filter((keyPair) => keyPair.keyCurve.curve === models_1.Curve.ED25519)
            .map(this.authenticationFromKeyPair.bind(this));
        const encryptionKeys = keyPairs
            .filter((keyPair) => keyPair.keyCurve.curve === models_1.Curve.X25519)
            .map(this.keyAgreementFromKeyPair.bind(this));
        const encodedEncryptionKeysStr = encryptionKeys
            .map(this.createMultibaseEncnumbasis.bind(this))
            .map((value) => `.${types_1.Numalgo2Prefix.keyAgreement}${value}`);
        const encodedSigningKeysStr = signingKeys
            .map(this.createMultibaseEncnumbasis.bind(this))
            .map((value) => `.${types_1.Numalgo2Prefix.authentication}${value}`);
        const encodedService = this.encodeService(services);
        return new PeerDID_1.PeerDID(models_1.DID.fromString(`did:peer:2${encodedEncryptionKeysStr}${encodedSigningKeysStr}.${types_1.Numalgo2Prefix.service}${encodedService}`));
    }
    createMultibaseEncnumbasis(material) {
        if (material.format !== types_1.VerificationMaterialFormatPeerDID.JWK) {
            throw new Errors_1.CastorError.InvalidKeyError();
        }
        const isVerificationMaterialAgreement = material instanceof types_1.VerificationMaterialAgreement;
        const decodedKey = isVerificationMaterialAgreement
            ? JWKHelper_1.JWKHelper.fromJWKAgreement(material)
            : JWKHelper_1.JWKHelper.fromJWKAuthentication(material);
        this.validateRawKeyLength(decodedKey);
        const multiCodec = new Multicodec_1.MultiCodec(decodedKey, isVerificationMaterialAgreement
            ? Multicodec_1.MultiCodec.KeyType.agreement
            : Multicodec_1.MultiCodec.KeyType.authenticate);
        return base58_1.base58btc.encode(multiCodec.value);
    }
    encodeService(services) {
        const peerDIDServices = services.map((service) => new PeerDID_1.PeerDIDService(service.type[0], service.serviceEndpoint.uri, service.serviceEndpoint.routingKeys, service.serviceEndpoint.accept).encode());
        if (peerDIDServices.length === 1) {
            const peerDIDService = peerDIDServices[0];
            return Buffer.from(JSON.stringify(peerDIDService)).toString("base64url");
        }
        return Buffer.from(JSON.stringify(peerDIDServices)).toString("base64url");
    }
    validateRawKeyLength(key) {
        if (key.length !== 32) {
            throw new Errors_1.CastorError.InvalidKeyError();
        }
    }
    keyAgreementFromKeyPair(keyPair) {
        const octet = this.octetPublicKey(keyPair);
        if (keyPair.keyCurve.curve !== models_1.Curve.X25519) {
            throw new Errors_1.CastorError.InvalidPublicKeyEncoding();
        }
        return new types_1.VerificationMaterialAgreement(JSON.stringify(octet), types_1.VerificationMethodTypeAgreement.JSON_WEB_KEY_2020, types_1.VerificationMaterialFormatPeerDID.JWK);
    }
    authenticationFromKeyPair(keyPair) {
        const octet = this.octetPublicKey(keyPair);
        if (keyPair.keyCurve.curve !== models_1.Curve.ED25519) {
            throw new Errors_1.CastorError.InvalidPublicKeyEncoding();
        }
        return new types_1.VerificationMaterialAuthentication(JSON.stringify(octet), types_1.VerificationMethodTypeAuthentication.JSON_WEB_KEY_2020, types_1.VerificationMaterialFormatPeerDID.JWK);
    }
    octetPublicKey(keyPair) {
        return {
            crv: keyPair.keyCurve.curve,
            kty: "OKP",
            x: keyPair.publicKey.value,
        };
    }
}
exports.PeerDIDCreate = PeerDIDCreate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGVlckRJRENyZWF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wZWVyLWRpZC9QZWVyRElEQ3JlYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDZDQUswQjtBQUMxQixvREFBc0Q7QUFDdEQsbURBQXNFO0FBQ3RFLHFEQUFrRDtBQUNsRCx1Q0FBb0Q7QUFDcEQsbUNBUWlCO0FBRWpCLHNEQUFzRDtBQUV0RCxNQUFhLGFBQWE7SUFDeEIsYUFBYSxDQUFDLFFBQW1CLEVBQUUsUUFBOEI7UUFDL0QsTUFBTSxXQUFXLEdBQUcsUUFBUTthQUN6QixNQUFNLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxLQUFLLGNBQUssQ0FBQyxPQUFPLENBQUM7YUFDN0QsR0FBRyxDQUFDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNsRCxNQUFNLGNBQWMsR0FBRyxRQUFRO2FBQzVCLE1BQU0sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEtBQUssY0FBSyxDQUFDLE1BQU0sQ0FBQzthQUM1RCxHQUFHLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBRWhELE1BQU0sd0JBQXdCLEdBQUcsY0FBYzthQUM1QyxHQUFHLENBQUMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUMvQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLElBQUksc0JBQWMsQ0FBQyxZQUFZLEdBQUcsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUU3RCxNQUFNLHFCQUFxQixHQUFHLFdBQVc7YUFDdEMsR0FBRyxDQUFDLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxJQUFJLENBQUMsSUFB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