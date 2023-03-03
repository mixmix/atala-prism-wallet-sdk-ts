"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWKHelper = void 0;
const Errors_1 = require("../../domain/models/Errors");
const types_1 = require("../types");
const base64_1 = require("multiformats/bases/base64");
class JWKHelper {
    static fromJWKAgreement(material) {
        const jsonObject = JSON.parse(material.value);
        const crv = jsonObject.crv;
        const xKey = jsonObject.x;
        if (crv !== "X25519") {
            throw new Errors_1.CastorError.InvalidJWKKeysError();
        }
        return Buffer.from(xKey, "base64url");
    }
    static fromJWKAuthentication(material) {
        const jsonObject = JSON.parse(material.value);
        const crv = jsonObject.crv;
        const xKey = jsonObject.x;
        if (crv !== "Ed25519") {
            throw new Errors_1.CastorError.InvalidJWKKeysError();
        }
        return Buffer.from(xKey, "base64url");
    }
    static toJWK(publicKey, material) {
        const xKeyString = base64_1.base64url.encode(publicKey);
        let crv;
        if (material instanceof types_1.VerificationMethodTypeAgreement) {
            crv = "X25519";
        }
        else if (material instanceof types_1.VerificationMethodTypeAuthentication) {
            crv = "Ed25519";
        }
        else {
            throw new Errors_1.CastorError.InvalidJWKKeysError();
        }
        //base64Url is adding u as base64url multibase codec which we need to strip
        return JSON.stringify({
            crv: crv,
            kty: "OKP",
            x: xKeyString.slice(1),
        });
    }
}
exports.JWKHelper = JWKHelper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSldLSGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3BlZXItZGlkL2hlbHBlcnMvSldLSGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHVEQUF5RDtBQUN6RCxvQ0FNa0I7QUFDbEIsc0RBQXNEO0FBTXRELE1BQWEsU0FBUztJQUNwQixNQUFNLENBQUMsZ0JBQWdCLENBQUMsUUFBdUM7UUFDN0QsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDOUMsTUFBTSxHQUFHLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQztRQUMzQixNQUFNLElBQUksR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQzFCLElBQUksR0FBRyxLQUFLLFFBQVEsRUFBRTtZQUNwQixNQUFNLElBQUksb0JBQVcsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1NBQzdDO1FBQ0QsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRUQsTUFBTSxDQUFDLHFCQUFxQixDQUMxQixRQUE0QztRQUU1QyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM5QyxNQUFNLEdBQUcsR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDO1FBQzNCLE1BQU0sSUFBSSxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDMUIsSUFBSSxHQUFHLEtBQUssU0FBUyxFQUFFO1lBQ3JCLE1BQU0sSUFBSSxvQkFBVyxDQUFDLG1CQUFtQixFQUFFLENBQUM7U0FDN0M7UUFDRCxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRCxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQXFCLEVBQUUsUUFBdUM7UUFDekUsTUFBTSxVQUFVLEdBQUcsa0JBQVMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDL0MsSUFBSSxHQUFXLENBQUM7UUFDaEIsSUFBSSxRQUFRLFlBQVksdUNBQStCLEVBQUU7WUFDdkQsR0FBRyxHQUFHLFFBQVEsQ0FBQztTQUNoQjthQUFNLElBQUksUUFBUSxZQUFZLDRDQUFvQyxFQUFFO1lBQ25FLEdBQUcsR0FBRyxTQUFTLENBQUM7U0FDakI7YUFBTTtZQUNMLE1BQU0sSUFBSSxvQkFBVyxDQUFDLG1CQUFtQixFQUFFLENBQUM7U0FDN0M7UUFDRCwyRUFBMkU7UUFDM0UsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQ3BCLEdBQUcsRUFBRSxHQUFHO1lBQ1IsR0FBRyxFQUFFLEtBQUs7WUFDVixDQUFDLEVBQUUsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDdkIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBeENELDhCQXdDQyJ9