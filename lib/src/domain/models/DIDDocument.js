"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DIDDocument = exports.CapabilityDelegation = exports.CapabilityInvocation = exports.KeyAgreement = exports.AssertionMethod = exports.Authentication = exports.Services = exports.VerificationMethods = exports.Controller = exports.AlsoKnownAs = exports.Service = exports.VerificationMethod = exports.ServiceEndpoint = void 0;
const Errors_1 = require("./Errors");
const KeyCurve_1 = require("./KeyCurve");
class ServiceEndpoint {
    uri;
    accept;
    routingKeys;
    constructor(uri, accept = [], routingKeys = []) {
        this.uri = uri;
        this.accept = accept;
        this.routingKeys = routingKeys;
    }
}
exports.ServiceEndpoint = ServiceEndpoint;
class VerificationMethod {
    id;
    controller;
    type;
    publicKeyJwk;
    publicKeyMultibase;
    constructor(id, controller, type, publicKeyJwk, publicKeyMultibase) {
        this.id = id;
        this.controller = controller;
        this.type = type;
        this.publicKeyJwk = publicKeyJwk;
        this.publicKeyMultibase = publicKeyMultibase;
    }
    static getCurveByType(type) {
        switch (type) {
            case KeyCurve_1.Curve.X25519:
                return KeyCurve_1.Curve.X25519;
            case KeyCurve_1.Curve.ED25519:
                return KeyCurve_1.Curve.ED25519;
            case KeyCurve_1.Curve.SECP256K1:
                return KeyCurve_1.Curve.SECP256K1;
            default:
                throw new Errors_1.CastorError.InvalidKeyError();
        }
    }
}
exports.VerificationMethod = VerificationMethod;
class Service {
    id;
    type;
    serviceEndpoint;
    constructor(id, type, serviceEndpoint) {
        this.id = id;
        this.type = type;
        this.serviceEndpoint = serviceEndpoint;
    }
}
exports.Service = Service;
class AlsoKnownAs {
    values;
    constructor(values) {
        this.values = values;
    }
}
exports.AlsoKnownAs = AlsoKnownAs;
class Controller {
    values;
    constructor(values) {
        this.values = values;
    }
}
exports.Controller = Controller;
class VerificationMethods {
    values;
    constructor(values) {
        this.values = values;
    }
}
exports.VerificationMethods = VerificationMethods;
class Services {
    values;
    constructor(values) {
        this.values = values;
    }
}
exports.Services = Services;
class Authentication {
    urls;
    verificationMethods;
    constructor(urls, verificationMethods) {
        this.urls = urls;
        this.verificationMethods = verificationMethods;
    }
}
exports.Authentication = Authentication;
class AssertionMethod {
    urls;
    verificationMethods;
    constructor(urls, verificationMethods) {
        this.urls = urls;
        this.verificationMethods = verificationMethods;
    }
}
exports.AssertionMethod = AssertionMethod;
class KeyAgreement {
    urls;
    verificationMethods;
    constructor(urls, verificationMethods) {
        this.urls = urls;
        this.verificationMethods = verificationMethods;
    }
}
exports.KeyAgreement = KeyAgreement;
class CapabilityInvocation {
    urls;
    verificationMethods;
    constructor(urls, verificationMethods) {
        this.urls = urls;
        this.verificationMethods = verificationMethods;
    }
}
exports.CapabilityInvocation = CapabilityInvocation;
class CapabilityDelegation {
    urls;
    verificationMethods;
    constructor(urls, verificationMethods) {
        this.urls = urls;
        this.verificationMethods = verificationMethods;
    }
}
exports.CapabilityDelegation = CapabilityDelegation;
class DIDDocument {
    id;
    coreProperties;
    constructor(id, coreProperties) {
        this.id = id;
        this.coreProperties = coreProperties;
    }
}
exports.DIDDocument = DIDDocument;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRElERG9jdW1lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZG9tYWluL21vZGVscy9ESUREb2N1bWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxxQ0FBdUM7QUFDdkMseUNBQW1DO0FBRW5DLE1BQWEsZUFBZTtJQUVqQjtJQUNBO0lBQ0E7SUFIVCxZQUNTLEdBQVcsRUFDWCxTQUF3QixFQUFFLEVBQzFCLGNBQTZCLEVBQUU7UUFGL0IsUUFBRyxHQUFILEdBQUcsQ0FBUTtRQUNYLFdBQU0sR0FBTixNQUFNLENBQW9CO1FBQzFCLGdCQUFXLEdBQVgsV0FBVyxDQUFvQjtJQUNyQyxDQUFDO0NBQ0w7QUFORCwwQ0FNQztBQUVELE1BQWEsa0JBQWtCO0lBRXBCO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFMVCxZQUNTLEVBQVUsRUFDVixVQUFrQixFQUNsQixJQUFZLEVBQ1osWUFBa0MsRUFDbEMsa0JBQTJCO1FBSjNCLE9BQUUsR0FBRixFQUFFLENBQVE7UUFDVixlQUFVLEdBQVYsVUFBVSxDQUFRO1FBQ2xCLFNBQUksR0FBSixJQUFJLENBQVE7UUFDWixpQkFBWSxHQUFaLFlBQVksQ0FBc0I7UUFDbEMsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFTO0lBQ2pDLENBQUM7SUFFSixNQUFNLENBQUMsY0FBYyxDQUFDLElBQVk7UUFDaEMsUUFBUSxJQUFJLEVBQUU7WUFDWixLQUFLLGdCQUFLLENBQUMsTUFBTTtnQkFDZixPQUFPLGdCQUFLLENBQUMsTUFBTSxDQUFDO1lBQ3RCLEtBQUssZ0JBQUssQ0FBQyxPQUFPO2dCQUNoQixPQUFPLGdCQUFLLENBQUMsT0FBTyxDQUFDO1lBQ3ZCLEtBQUssZ0JBQUssQ0FBQyxTQUFTO2dCQUNsQixPQUFPLGdCQUFLLENBQUMsU0FBUyxDQUFDO1lBQ3pCO2dCQUNFLE1BQU0sSUFBSSxvQkFBVyxDQUFDLGVBQWUsRUFBRSxDQUFDO1NBQzNDO0lBQ0gsQ0FBQztDQUNGO0FBckJELGdEQXFCQztBQUVELE1BQWEsT0FBTztJQUVUO0lBQ0E7SUFDQTtJQUhULFlBQ1MsRUFBVSxFQUNWLElBQW1CLEVBQ25CLGVBQWdDO1FBRmhDLE9BQUUsR0FBRixFQUFFLENBQVE7UUFDVixTQUFJLEdBQUosSUFBSSxDQUFlO1FBQ25CLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtJQUN0QyxDQUFDO0NBQ0w7QUFORCwwQkFNQztBQUVELE1BQWEsV0FBVztJQUNIO0lBQW5CLFlBQW1CLE1BQXFCO1FBQXJCLFdBQU0sR0FBTixNQUFNLENBQWU7SUFBRyxDQUFDO0NBQzdDO0FBRkQsa0NBRUM7QUFFRCxNQUFhLFVBQVU7SUFDRjtJQUFuQixZQUFtQixNQUFrQjtRQUFsQixXQUFNLEdBQU4sTUFBTSxDQUFZO0lBQUcsQ0FBQztDQUMxQztBQUZELGdDQUVDO0FBRUQsTUFBYSxtQkFBbUI7SUFDWDtJQUFuQixZQUFtQixNQUFpQztRQUFqQyxXQUFNLEdBQU4sTUFBTSxDQUEyQjtJQUFHLENBQUM7Q0FDekQ7QUFGRCxrREFFQztBQUVELE1BQWEsUUFBUTtJQUNBO0lBQW5CLFlBQW1CLE1BQXNCO1FBQXRCLFdBQU0sR0FBTixNQUFNLENBQWdCO0lBQUcsQ0FBQztDQUM5QztBQUZELDRCQUVDO0FBRUQsTUFBYSxjQUFjO0lBRWhCO0lBQ0E7SUFGVCxZQUNTLElBQW1CLEVBQ25CLG1CQUE4QztRQUQ5QyxTQUFJLEdBQUosSUFBSSxDQUFlO1FBQ25CLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBMkI7SUFDcEQsQ0FBQztDQUNMO0FBTEQsd0NBS0M7QUFFRCxNQUFhLGVBQWU7SUFFakI7SUFDQTtJQUZULFlBQ1MsSUFBbUIsRUFDbkIsbUJBQThDO1FBRDlDLFNBQUksR0FBSixJQUFJLENBQWU7UUFDbkIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUEyQjtJQUNwRCxDQUFDO0NBQ0w7QUFMRCwwQ0FLQztBQUVELE1BQWEsWUFBWTtJQUVkO0lBQ0E7SUFGVCxZQUNTLElBQW1CLEVBQ25CLG1CQUE4QztRQUQ5QyxTQUFJLEdBQUosSUFBSSxDQUFlO1FBQ25CLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBMkI7SUFDcEQsQ0FBQztDQUNMO0FBTEQsb0NBS0M7QUFFRCxNQUFhLG9CQUFvQjtJQUV0QjtJQUNBO0lBRlQsWUFDUyxJQUFtQixFQUNuQixtQkFBOEM7UUFEOUMsU0FBSSxHQUFKLElBQUksQ0FBZTtRQUNuQix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQTJCO0lBQ3BELENBQUM7Q0FDTDtBQUxELG9EQUtDO0FBRUQsTUFBYSxvQkFBb0I7SUFFdEI7SUFDQTtJQUZULFlBQ1MsSUFBbUIsRUFDbkIsbUJBQThDO1FBRDlDLFNBQUksR0FBSixJQUFJLENBQWU7UUFDbkIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUEyQjtJQUNwRCxDQUFDO0NBQ0w7QUFMRCxvREFLQztBQWNELE1BQWEsV0FBVztJQUViO0lBQ0E7SUFGVCxZQUNTLEVBQU8sRUFDUCxjQUE4QztRQUQ5QyxPQUFFLEdBQUYsRUFBRSxDQUFLO1FBQ1AsbUJBQWMsR0FBZCxjQUFjLENBQWdDO0lBQ3BELENBQUM7Q0FDTDtBQUxELGtDQUtDIn0=