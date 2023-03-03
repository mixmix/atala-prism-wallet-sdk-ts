"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const domain_1 = require("../../src/domain");
const Apollo_1 = __importDefault(require("../../src/apollo/Apollo"));
const Castor_1 = __importDefault(require("../../src/castor/Castor"));
const types_1 = require("../../src/peer-did/types");
const Multicodec_1 = require("../../src/peer-did/helpers/Multicodec");
const PeerDIDResolver_1 = require("../../src/castor/resolver/PeerDIDResolver");
describe("DIDCreateTest", () => {
    it("Should test milticodec coding", () => {
        const testData = Uint8Array.from(Buffer.from("test1"));
        const multicodec = new Multicodec_1.MultiCodec(testData);
        (0, chai_1.expect)(testData).to.deep.equal(multicodec.decode()[1]);
    });
    it("Should decode ecnumbasic", () => {
        const ecnumBasis = "z6MkqRYqQiSgvZQdnBytw86Qbs2ZWUkGv22od935YF4s8M7V";
        const jwk = {
            crv: "Ed25519",
            kty: "OKP",
            x: "owBhCbktDjkfS6PdQddT0D3yjSitaSysP3YimJ_YgmA",
        };
        const jwkJson = JSON.stringify(jwk);
        const result = new types_1.VerificationMaterialAuthentication(jwkJson, types_1.VerificationMethodTypeAuthentication.JSON_WEB_KEY_2020, types_1.VerificationMaterialFormatPeerDID.JWK);
        const resolver = new PeerDIDResolver_1.PeerDIDResolver();
        const ecnumbasisResult = resolver.decodeMultibaseEncnumbasisAuth(ecnumBasis, types_1.VerificationMaterialFormatPeerDID.JWK);
        (0, chai_1.expect)(result.type).to.equal(ecnumbasisResult[1].type);
        (0, chai_1.expect)(result.value).to.equal(ecnumbasisResult[1].value);
        (0, chai_1.expect)(result.format).to.equal(ecnumbasisResult[1].format);
    });
    it("Should create the peerDID correctly", async () => {
        const validPeerDID = `did:peer:2.Ez6LSoHkfN1Y4nK9RCjx7vopWsLrMGNFNgTNZgoCNQrTzmb1n.Vz6MknRZmapV7uYZQuZez9n9N3tQotjRN18UGS68Vcfo6gR4h.SeyJyIjpbImRpZDpleGFtcGxlOnNvbWVtZWRpYXRvciNzb21la2V5Il0sInMiOiJodHRwczovL2V4YW1wbGUuY29tL2VuZHBvaW50IiwiYSI6W10sInQiOiJkbSJ9`;
        const apollo = new Apollo_1.default();
        const castor = new Castor_1.default(apollo);
        const agreementKeyCurve = {
            keyCurve: {
                curve: domain_1.Curve.X25519,
            },
        };
        const authenticationKeyCurve = {
            keyCurve: {
                curve: domain_1.Curve.ED25519,
            },
        };
        const KeyAgreementKeyPair = {
            ...agreementKeyCurve,
            privateKey: {
                ...agreementKeyCurve,
                value: "COd9Xhr-amD7fuswWId2706JBUY_tmjp9eiNEieJeEE",
            },
            publicKey: {
                ...agreementKeyCurve,
                value: "rI3CjEk-yaFi5bQTavOmV25EJHQnDQJeIi4OV6p_f2U",
            },
        };
        const authenticationKeyPair = {
            ...authenticationKeyCurve,
            privateKey: {
                ...authenticationKeyCurve,
                value: "JLIJQ5jlkyqtGmtOth6yggJLLC0zuRhUPiBhd1-rGPs",
            },
            publicKey: {
                ...authenticationKeyCurve,
                value: "dm5f2GdR5BaHpRxB8bTElvE_0gIC2p404Msx9swJ914",
            },
        };
        const keyPairs = [KeyAgreementKeyPair, authenticationKeyPair];
        const services = [
            {
                id: "didcomm",
                type: ["DIDCommMessaging"],
                serviceEndpoint: {
                    uri: "https://example.com/endpoint",
                    accept: [],
                    routingKeys: ["did:example:somemediator#somekey"],
                },
            },
        ];
        const did = await castor.createPeerDID(keyPairs, services);
        (0, chai_1.expect)(did.toString()).to.equal(validPeerDID);
    });
    it("Should resolver peerdid correctly", async () => {
        const mypeerDID = new domain_1.DID("did", "peer", "2.Ez6LSms555YhFthn1WV8ciDBpZm86hK9tp83WojJUmxPGk1hZ.Vz6MkmdBjMyB4TS5UbbQw54szm8yvMMf1ftGV2sQVYAxaeWhE.SeyJpZCI6Im5ldy1pZCIsInQiOiJkbSIsInMiOiJodHRwczovL21lZGlhdG9yLnJvb3RzaWQuY2xvdWQiLCJhIjpbImRpZGNvbW0vdjIiXX0");
        const apollo = new Apollo_1.default();
        const castor = new Castor_1.default(apollo);
        const document = await castor.resolveDID(mypeerDID.toString());
        (0, chai_1.expect)(document.id.toString()).to.equal(mypeerDID.toString());
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGVlckRJRC50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vdGVzdHMvY2FzdG9yL1BlZXJESUQudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLCtCQUE4QjtBQUU5Qiw2Q0FBZ0U7QUFDaEUscUVBQTZDO0FBRTdDLHFFQUE2QztBQUM3QyxvREFJa0M7QUFDbEMsc0VBQW1FO0FBQ25FLCtFQUE0RTtBQUU1RSxRQUFRLENBQUMsZUFBZSxFQUFFLEdBQUcsRUFBRTtJQUM3QixFQUFFLENBQUMsK0JBQStCLEVBQUUsR0FBRyxFQUFFO1FBQ3ZDLE1BQU0sUUFBUSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBRXZELE1BQU0sVUFBVSxHQUFHLElBQUksdUJBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUU1QyxJQUFBLGFBQU0sRUFBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN6RCxDQUFDLENBQUMsQ0FBQztJQUNILEVBQUUsQ0FBQywwQkFBMEIsRUFBRSxHQUFHLEVBQUU7UUFDbEMsTUFBTSxVQUFVLEdBQUcsa0RBQWtELENBQUM7UUFDdEUsTUFBTSxHQUFHLEdBQUc7WUFDVixHQUFHLEVBQUUsU0FBUztZQUNkLEdBQUcsRUFBRSxLQUFLO1lBQ1YsQ0FBQyxFQUFFLDZDQUE2QztTQUNqRCxDQUFDO1FBQ0YsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNwQyxNQUFNLE1BQU0sR0FBRyxJQUFJLDBDQUFrQyxDQUNuRCxPQUFPLEVBQ1AsNENBQW9DLENBQUMsaUJBQWlCLEVBQ3RELHlDQUFpQyxDQUFDLEdBQUcsQ0FDdEMsQ0FBQztRQUVGLE1BQU0sUUFBUSxH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