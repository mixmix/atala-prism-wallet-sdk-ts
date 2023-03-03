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
const models_1 = require("../domain/models");
const PrismDIDPublicKey_1 = require("./did/prismDID/PrismDIDPublicKey");
const DIDParser = __importStar(require("./parser/DIDParser"));
const Protos = __importStar(require("./protos/node_models"));
const sha256_1 = require("@stablelib/sha256");
const PeerDIDResolver_1 = require("./resolver/PeerDIDResolver");
const PeerDIDCreate_1 = require("../peer-did/PeerDIDCreate");
const LongFormPrismDIDResolver_1 = require("./resolver/LongFormPrismDIDResolver");
const Errors_1 = require("../domain/models/Errors");
class Castor {
    apollo;
    resolvers;
    constructor(apollo) {
        this.apollo = apollo;
        this.resolvers = [
            new PeerDIDResolver_1.PeerDIDResolver(),
            new LongFormPrismDIDResolver_1.LongFormPrismDIDResolver(this.apollo),
        ];
    }
    parseDID(did) {
        return DIDParser.parse(did);
    }
    async createPrismDID(masterPublicKey, services) {
        const id = (0, PrismDIDPublicKey_1.getUsageId)(PrismDIDPublicKey_1.Usage.MASTER_KEY);
        const publicKey = new PrismDIDPublicKey_1.PrismDIDPublicKey(this.apollo, id, PrismDIDPublicKey_1.Usage.MASTER_KEY, masterPublicKey);
        const didCreationData = new Protos.io.iohk.atala.prism.protos.CreateDIDOperation.DIDCreationData({
            public_keys: [publicKey.toProto()],
            services: services?.map((service) => {
                return new Protos.io.iohk.atala.prism.protos.Service({
                    service_endpoint: [service.serviceEndpoint.uri],
                    id: service.id,
                    type: service.type[0],
                });
            }),
        });
        const didOperation = new Protos.io.iohk.atala.prism.protos.CreateDIDOperation({
            did_data: didCreationData,
        });
        const operation = new Protos.io.iohk.atala.prism.protos.AtalaOperation({
            create_did: didOperation,
        });
        const encodedState = Buffer.from(operation.serializeBinary());
        const sha256 = new sha256_1.SHA256();
        const stateHash = Buffer.from(sha256.update(encodedState).digest()).toString("hex");
        const base64State = encodedState.toString("base64url");
        const methodSpecificId = new models_1.PrismDIDMethodId([stateHash, base64State]);
        return new models_1.DID("did", "prism", methodSpecificId.toString());
    }
    async createPeerDID(keyPairs, services) {
        const peerDIDOperation = new PeerDIDCreate_1.PeerDIDCreate();
        const peerDID = peerDIDOperation.createPeerDID(keyPairs, services);
        return peerDID.did;
    }
    async resolveDID(did) {
        const parsed = models_1.DID.fromString(did);
        const resolver = this.resolvers.find((resolver) => resolver.method === parsed.method);
        if (!resolver) {
            throw new Errors_1.CastorError.NotPossibleToResolveDID();
        }
        return resolver.resolve(did);
    }
    async verifySignature(did, challenge, signature) {
        throw new Error("Not implemented");
    }
}
exports.default = Castor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FzdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2Nhc3Rvci9DYXN0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUdBLDZDQVEwQjtBQUMxQix3RUFJMEM7QUFDMUMsOERBQWdEO0FBQ2hELDZEQUErQztBQUMvQyw4Q0FBMkM7QUFFM0MsZ0VBQTZEO0FBQzdELDZEQUEwRDtBQUMxRCxrRkFBK0U7QUFDL0Usb0RBQXNEO0FBRXRELE1BQXFCLE1BQU07SUFDakIsTUFBTSxDQUFTO0lBQ2YsU0FBUyxDQUFnQjtJQUVqQyxZQUFZLE1BQWM7UUFDeEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBRztZQUNmLElBQUksaUNBQWUsRUFBRTtZQUNyQixJQUFJLG1EQUF3QixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7U0FDMUMsQ0FBQztJQUNKLENBQUM7SUFFRCxRQUFRLENBQUMsR0FBVztRQUNsQixPQUFPLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVELEtBQUssQ0FBQyxjQUFjLENBQ2xCLGVBQTBCLEVBQzFCLFFBQWdDO1FBRWhDLE1BQU0sRUFBRSxHQUFHLElBQUEsOEJBQVUsRUFBQyx5QkFBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3hDLE1BQU0sU0FBUyxHQUFHLElBQUkscUNBQWlCLENBQ3JDLElBQUksQ0FBQyxNQUFNLEVBQ1gsRUFBRSxFQUNGLHlCQUFLLENBQUMsVUFBVSxFQUNoQixlQUFlLENBQ2hCLENBQUM7UUFDRixNQUFNLGVBQWUsR0FDbkIsSUFBSSxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxlQUFlLENBQUM7WUFDdkUsV0FBVyxFQUFFLENBQUMsU0FBUyxDQUFDLE9B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