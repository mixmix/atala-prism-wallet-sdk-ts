"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerificationMaterialAuthentication = exports.VerificationMaterialAgreement = exports.VerificationMaterialPeerDIDWithAuthentication = exports.VerificationMaterialPeerDIDWithAgreement = exports.VerificationMethodTypeAuthentication = exports.VerificationMethodTypeAgreement = exports.Numalgo2Prefix = exports.VerificationMethodType = exports.VerificationMaterialFormatPeerDID = void 0;
var VerificationMaterialFormatPeerDID;
(function (VerificationMaterialFormatPeerDID) {
    VerificationMaterialFormatPeerDID["JWK"] = "jwk";
})(VerificationMaterialFormatPeerDID = exports.VerificationMaterialFormatPeerDID || (exports.VerificationMaterialFormatPeerDID = {}));
class VerificationMethodType {
    value;
    constructor(value) {
        this.value = value;
    }
}
exports.VerificationMethodType = VerificationMethodType;
var Numalgo2Prefix;
(function (Numalgo2Prefix) {
    Numalgo2Prefix["authentication"] = "V";
    Numalgo2Prefix["keyAgreement"] = "E";
    Numalgo2Prefix["service"] = "S";
})(Numalgo2Prefix = exports.Numalgo2Prefix || (exports.Numalgo2Prefix = {}));
class VerificationMethodTypeAgreement extends VerificationMethodType {
    static JSON_WEB_KEY_2020 = new VerificationMethodTypeAgreement("JsonWebKey2020");
    static X25519_KEY_AGREEMENT_KEY_2019 = new VerificationMethodTypeAgreement("X25519KeyAgreementKey2019");
    static X25519_KEY_AGREEMENT_KEY_2020 = new VerificationMethodTypeAgreement("X25519KeyAgreementKey2020");
}
exports.VerificationMethodTypeAgreement = VerificationMethodTypeAgreement;
class VerificationMethodTypeAuthentication extends VerificationMethodType {
    static JSON_WEB_KEY_2020 = new VerificationMethodTypeAuthentication("JsonWebKey2020");
    static ED25519_KEY_AGREEMENT_KEY_2018 = new VerificationMethodTypeAuthentication("Ed25519VerificationKey2018");
    static ED25519_KEY_AGREEMENT_KEY_2020 = new VerificationMethodTypeAuthentication("Ed25519VerificationKey2020");
}
exports.VerificationMethodTypeAuthentication = VerificationMethodTypeAuthentication;
class VerificationMaterialPeerDIDWithAgreement {
    keyType;
    value;
    agreement;
    constructor(keyType, value, agreement) {
        this.keyType = keyType;
        this.value = value;
        this.agreement = agreement;
    }
}
exports.VerificationMaterialPeerDIDWithAgreement = VerificationMaterialPeerDIDWithAgreement;
class VerificationMaterialPeerDIDWithAuthentication {
    keyType;
    value;
    authentication;
    constructor(keyType, value, authentication) {
        this.keyType = keyType;
        this.value = value;
        this.authentication = authentication;
    }
}
exports.VerificationMaterialPeerDIDWithAuthentication = VerificationMaterialPeerDIDWithAuthentication;
class VerificationMaterialAgreement {
    format;
    value;
    type;
    constructor(value, type, format) {
        this.format = format;
        this.value = value;
        this.type = type;
    }
    get keyType() {
        return this.type;
    }
    get agreement() {
        return this;
    }
}
exports.VerificationMaterialAgreement = VerificationMaterialAgreement;
class VerificationMaterialAuthentication {
    format;
    value;
    type;
    constructor(value, type, format) {
        this.format = format;
        this.value = value;
        this.type = type;
    }
    get keyType() {
        return this.type;
    }
    get authentication() {
        return this;
    }
}
exports.VerificationMaterialAuthentication = VerificationMaterialAuthentication;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcGVlci1kaWQvdHlwZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsSUFBWSxpQ0FFWDtBQUZELFdBQVksaUNBQWlDO0lBQzNDLGdEQUFXLENBQUE7QUFDYixDQUFDLEVBRlcsaUNBQWlDLEdBQWpDLHlDQUFpQyxLQUFqQyx5Q0FBaUMsUUFFNUM7QUFNRCxNQUFhLHNCQUFzQjtJQUNkO0lBQW5CLFlBQW1CLEtBQWE7UUFBYixVQUFLLEdBQUwsS0FBSyxDQUFRO0lBQUcsQ0FBQztDQUNyQztBQUZELHdEQUVDO0FBRUQsSUFBWSxjQUlYO0FBSkQsV0FBWSxjQUFjO0lBQ3hCLHNDQUFvQixDQUFBO0lBQ3BCLG9DQUFrQixDQUFBO0lBQ2xCLCtCQUFhLENBQUE7QUFDZixDQUFDLEVBSlcsY0FBYyxHQUFkLHNCQUFjLEtBQWQsc0JBQWMsUUFJekI7QUFRRCxNQUFhLCtCQUFnQyxTQUFRLHNCQUFzQjtJQUN6RSxNQUFNLENBQUMsaUJBQWlCLEdBQUcsSUFBSSwrQkFBK0IsQ0FDNUQsZ0JBQWdCLENBQ2pCLENBQUM7SUFDRixNQUFNLENBQUMsNkJBQTZCLEdBQUcsSUFBSSwrQkFBK0IsQ0FDeEUsMkJBQTJCLENBQzVCLENBQUM7SUFDRixNQUFNLENBQUMsNkJBQTZCLEdBQUcsSUFBSSwrQkFBK0IsQ0FDeEUsMkJBQTJCLENBQzVCLENBQUM7O0FBVEosMEVBVUM7QUFFRCxNQUFhLG9DQUFxQyxTQUFRLHNCQUFzQjtJQUM5RSxNQUFNLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxvQ0FBb0MsQ0FDakUsZ0JBQWdCLENBQ2pCLENBQUM7SUFDRixNQUFNLENBQUMsOEJBQThCLEdBQ25DLElBQUksb0NBQW9DLENBQUMsNEJBQTRCLENBQUMsQ0FBQztJQUN6RSxNQUFNLENBQUMsOEJBQThCLEdBQ25DLElBQUksb0NBQW9DLENBQUMsNEJBQTRCLENBQUMsQ0FBQzs7QUFQM0Usb0ZBUUM7QUFrQkQsTUFBYSx3Q0FBd0M7SUFJMUM7SUFDQTtJQUNBO0lBSFQsWUFDUyxPQUFzQyxFQUN0QyxLQUFhLEVBQ2IsU0FBd0M7UUFGeEMsWUFBTyxHQUFQLE9BQU8sQ0FBK0I7UUFDdEMsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQUNiLGNBQVMsR0FBVCxTQUFTLENBQStCO0lBQzlDLENBQUM7Q0FDTDtBQVJELDRGQVFDO0FBRUQsTUFBYSw2Q0FBNkM7SUFJL0M7SUFDQTtJQUNBO0lBSFQsWUFDUyxPQUFzQyxFQUN0QyxLQUFhLEVBQ2IsY0FBa0Q7UUFGbEQsWUFBTyxHQUFQLE9BQU8sQ0FBK0I7UUFDdEMsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQUNiLG1CQUFjLEdBQWQsY0FBYyxDQUFvQztJQUN4RCxDQUFDO0NBQ0w7QUFSRCxzR0FRQztBQUVELE1BQWEsNkJBQTZCO0lBR3hCLE1BQU0sQ0FBb0M7SUFDMUMsS0FBSyxDQUFTO0lBQ2QsSUFBSSxDQUFrQztJQUV0RCxZQUNFLEtBQWEsRUFDYixJQUFxQyxFQUNyQyxNQUF5QztRQUV6QyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNuQixDQUFDO0lBRUQsSUFBSSxPQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ25CLENBQUM7SUFFRCxJQUFJLFNBQVM7UUFDWCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7Q0FDRjtBQXhCRCxzRUF3QkM7QUFFRCxNQUFhLGtDQUFrQztJQUc3QixNQUFNLENBQW9DO0lBQzFDLEtBQUssQ0FBUztJQUNkLElBQUksQ0FBdUM7SUFFM0QsWUFDRSxLQUFhLEVBQ2IsSUFBMEMsRUFDMUMsTUFBeUM7UUFFekMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDbkIsQ0FBQztJQUVELElBQUksT0FBTztRQUNULE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztJQUNuQixDQUFDO0lBRUQsSUFBSSxjQUFjO1FBQ2hCLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztDQUNGO0FBeEJELGdGQXdCQyJ9