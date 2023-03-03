"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const domain_1 = require("../../src/domain");
const Apollo_1 = __importDefault(require("../../src/apollo/Apollo"));
const Castor_1 = __importDefault(require("../../src/castor/Castor"));
describe("DIDCreateTest", () => {
    it("Should correctly create a prismDID from an existing HexKey", async () => {
        const apollo = new Apollo_1.default();
        const castor = new Castor_1.default(apollo);
        const didExample = "did:prism:82ef2865dc98665aac07f099a8d07d715923d7ac4c2a697c0297b13089efd1f2:CmYKZBJiCg1tYXN0ZXIoaW5kZXgpEAFKTwoJU2VjcDI1NmsxEkIwMzM0YjljZGU2MTQ5MGIwOTIwMDkyYzhlOWEyZDc0NTMzZDFjNmNiNDIyY2Y1MDQyM2E0ZTAwNmIwMTUwODc5MzA";
        const resolvedDID = await castor.resolveDID(didExample);
        const pubHex = "0434b9cde61490b0920092c8e9a2d74533d1c6cb422cf50423a4e006b015087930e4f9f7e496b1c8156ee92a44fc8be624b178be5d78b9877d5ccd431a54295ca7";
        const masterPublicKey = apollo.compressedPublicKeyFromPublicKey({
            keyCurve: {
                curve: domain_1.Curve.SECP256K1,
            },
            value: pubHex,
        }).uncompressed;
        const createdDID = await castor.createPrismDID(masterPublicKey, []);
        const resolveCreated = await castor.resolveDID(createdDID.toString());
        (0, chai_1.expect)(resolveCreated.id.toString()).to.be.equal(resolvedDID.id.toString());
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJpc21ESUQudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3Rlc3RzL2Nhc3Rvci9QcmlzbURJRC50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsK0JBQThCO0FBRTlCLDZDQUF5QztBQUN6QyxxRUFBNkM7QUFDN0MscUVBQTZDO0FBRTdDLFFBQVEsQ0FBQyxlQUFlLEVBQUUsR0FBRyxFQUFFO0lBQzdCLEVBQUUsQ0FBQyw0REFBNEQsRUFBRSxLQUFLLElBQUksRUFBRTtRQUMxRSxNQUFNLE1BQU0sR0FBRyxJQUFJLGdCQUFNLEVBQUUsQ0FBQztRQUM1QixNQUFNLE1BQU0sR0FBRyxJQUFJLGdCQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFbEMsTUFBTSxVQUFVLEdBQ2Qsd05BQXdOLENBQUM7UUFDM04sTUFBTSxXQUFXLEdBQUcsTUFBTSxNQUFNLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRXhELE1BQU0sTUFBTSxHQUNWLG9JQUFvSSxDQUFDO1FBRXZJLE1BQU0sZUFBZSxHQUFHLE1BQU0sQ0FBQyxnQ0FBZ0MsQ0FBQztZQUM5RCxRQUFRLEVBQUU7Z0JBQ1IsS0FBSyxFQUFFLGNBQUssQ0FBQyxTQUFTO2FBQ3ZCO1lBQ0QsS0FBSyxFQUFFLE1BQU07U0FDZCxDQUFDLENBQUMsWUFBWSxDQUFDO1FBRWhCLE1BQU0sVUFBVSxHQUFHLE1BQU0sTUFBTSxDQUFDLGNBQWMsQ0FBQyxlQUFlLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDcEUsTUFBTSxjQUFjLEdBQUcsTUFBTSxNQUFNLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBRXRFLElBQUEsYUFBTSxFQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7SUFDOUUsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9