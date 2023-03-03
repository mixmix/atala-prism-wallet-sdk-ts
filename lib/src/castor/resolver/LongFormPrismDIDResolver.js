"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LongFormPrismDIDResolver = void 0;
const sha256_1 = require("@stablelib/sha256");
const Errors_1 = require("../../domain/models/Errors");
const LongFormPrismDID_1 = require("../did/prismDID/LongFormPrismDID");
const models_1 = require("../../domain/models");
const DIDParser = __importStar(require("../parser/DIDParser"));
const Protos = __importStar(require("../protos/node_models"));
const PrismDIDPublicKey_1 = require("../did/prismDID/PrismDIDPublicKey");
class LongFormPrismDIDResolver {
    apollo;
    method = "prism";
    constructor(apollo) {
        this.apollo = apollo;
    }
    async resolve(didString) {
        const did = DIDParser.parse(didString);
        const prismDID = new LongFormPrismDID_1.LongFormPrismDID(did);
        const [verificationMethods, services] = this.decodeState(did, prismDID.stateHash, Buffer.from(prismDID.encodedState, "base64url"));
        const servicesProperty = new models_1.Services(services);
        const verificationMethodsProperty = new models_1.VerificationMethods([
            ...verificationMethods.values(),
        ]);
        const coreProperties = [];
        const authenticate = [];
        for (const [key, value] of verificationMethods) {
            authenticate.push(new models_1.Authentication([key], [value]));
        }
        coreProperties.push(...authenticate);
        coreProperties.push(servicesProperty);
        coreProperties.push(verificationMethodsProperty);
        return new models_1.DIDDocument(did, coreProperties);
    }
    decodeState(did, stateHash, encodedData) {
        try {
            const verifyEncodedState = new sha256_1.SHA256().update(encodedData).digest();
            const verifyEncodedStateHex = verifyEncodedState;
            if (Buffer.from(verifyEncodedState).toString("hex") !==
                Buffer.from(verifyEncodedStateHex).toString("hex")) {
                throw new Errors_1.CastorError.InitialStateOfDIDChanged();
            }
            const operation = Protos.io.iohk.atala.prism.protos.AtalaOperation.deserializeBinary(encodedData);
            const publicKeys = operation.create_did?.did_data?.public_keys?.map((key) => {
                return new PrismDIDPublicKey_1.PrismDIDPublicKey(this.apollo, (0, PrismDIDPublicKey_1.getUsageId)((0, PrismDIDPublicKey_1.getUsage)(key.usage)), (0, PrismDIDPublicKey_1.getUsage)(key.usage), {
                    keyCurve: {
                        curve: models_1.Curve.SECP256K1,
                    },
                    value: key.key_data,
                });
            }) || [];
            const services = operation.create_did?.did_data?.services?.map((service) => {
                return new models_1.Service(service.id, [service.type], new models_1.ServiceEndpoint(service.service_endpoint[0]));
            }) || [];
            const verificationMethods = publicKeys.reduce((partialResult, publicKey) => {
                const didUrl = new models_1.DIDUrl(did, [], new Map(), publicKey.id);
                const method = new models_1.VerificationMethod(didUrl.string(), did.toString(), publicKey.keyData.keyCurve.curve, undefined, publicKey.keyData.value);
                partialResult.set(didUrl.string(), method);
                return partialResult;
            }, new Map());
            return [verificationMethods, services];
        }
        catch (err) {
            throw new Errors_1.CastorError.InitialStateOfDIDChanged();
        }
    }
}
exports.LongFormPrismDIDResolver = LongFormPrismDIDResolver;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9uZ0Zvcm1QcmlzbURJRFJlc29sdmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Nhc3Rvci9yZXNvbHZlci9Mb25nRm9ybVByaXNtRElEUmVzb2x2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4Q0FBMkM7QUFDM0MsdURBQXlEO0FBRXpELHVFQUFvRTtBQUNwRSxnREFhNkI7QUFFN0IsK0RBQWlEO0FBQ2pELDhEQUFnRDtBQUNoRCx5RUFJMkM7QUFFM0MsTUFBYSx3QkFBd0I7SUFHZjtJQUZwQixNQUFNLEdBQUcsT0FBTyxDQUFDO0lBRWpCLFlBQW9CLE1BQWM7UUFBZCxXQUFNLEdBQU4sTUFBTSxDQUFRO0lBQUcsQ0FBQztJQUV0QyxLQUFLLENBQUMsT0FBTyxDQUFDLFNBQWlCO1FBQzdCLE1BQU0sR0FBRyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdkMsTUFBTSxRQUFRLEdBQUcsSUFBSSxtQ0FBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUUzQyxNQUFNLENBQUMsbUJBQW1CLEVBQUUsUUFBUSxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FDdEQsR0FBRyxFQUNILFFBQVEsQ0FBQyxTQUFTLEVBQ2xCLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxXQUFXLENBQUMsQ0FDaEQsQ0FBQztRQUNGLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxpQkFBbUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMzRCxNQUFNLDJCQUEyQixHQUFHLElBQUksNEJBQThCLENBQUM7WUFDckUsR0FBRyxtQkFBbUIsQ0FBQyxNQUFNLEVBQUU7U0FDaEMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxjQUFjLEdBQThCLEVBQUUsQ0FBQztRQUNyRCxNQUFNLFlBQVksR0FBZ0MsRUFBRSxDQUFDO1FBRXJELEtBQUssTUFBTSxD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