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
exports.PrismDIDPublicKey = exports.getUsage = exports.getUsageId = exports.getProtosUsage = exports.Usage = void 0;
const models_1 = require("../../../domain/models");
const Errors_1 = require("../../../domain/models/Errors");
const Protos = __importStar(require("../../protos/node_models"));
var Usage;
(function (Usage) {
    Usage["MASTER_KEY"] = "masterKey";
    Usage["ISSUING_KEY"] = "issuingKey";
    Usage["AUTHENTICATION_KEY"] = "authenticationKey";
    Usage["REVOCATION_KEY"] = "revocationKey";
    Usage["CAPABILITY_DELEGATION_KEY"] = "capabilityDelegationKey";
    Usage["CAPABILITY_INVOCATION_KEY"] = "capabilityInvocationKey";
    Usage["KEY_AGREEMENT_KEY"] = "keyAgreementKey";
    Usage["UNKNOWN_KEY"] = "unknownKey";
})(Usage = exports.Usage || (exports.Usage = {}));
function getProtosUsage(usage) {
    switch (usage) {
        case Usage.UNKNOWN_KEY:
            return Protos.io.iohk.atala.prism.protos.KeyUsage.UNKNOWN_KEY;
        case Usage.MASTER_KEY:
            return Protos.io.iohk.atala.prism.protos.KeyUsage.MASTER_KEY;
        case Usage.ISSUING_KEY:
            return Protos.io.iohk.atala.prism.protos.KeyUsage.ISSUING_KEY;
        case Usage.KEY_AGREEMENT_KEY:
            return Protos.io.iohk.atala.prism.protos.KeyUsage.KEY_AGREEMENT_KEY;
        case Usage.AUTHENTICATION_KEY:
            return Protos.io.iohk.atala.prism.protos.KeyUsage.AUTHENTICATION_KEY;
        case Usage.REVOCATION_KEY:
            return Protos.io.iohk.atala.prism.protos.KeyUsage.REVOCATION_KEY;
        case Usage.CAPABILITY_INVOCATION_KEY:
            return Protos.io.iohk.atala.prism.protos.KeyUsage
                .CAPABILITY_INVOCATION_KEY;
        case Usage.CAPABILITY_DELEGATION_KEY:
            return Protos.io.iohk.atala.prism.protos.KeyUsage
                .CAPABILITY_DELEGATION_KEY;
        default:
            return Protos.io.iohk.atala.prism.protos.KeyUsage.UNKNOWN_KEY;
    }
}
exports.getProtosUsage = getProtosUsage;
function getUsageId(index) {
    switch (index) {
        case Usage.MASTER_KEY:
            return "master(index)";
        case Usage.ISSUING_KEY:
            return "issuing(index)";
        case Usage.KEY_AGREEMENT_KEY:
            return "agreement(index)";
        case Usage.AUTHENTICATION_KEY:
            return "authentication(index)";
        case Usage.REVOCATION_KEY:
            return "revocation(index)";
        case Usage.CAPABILITY_DELEGATION_KEY:
            return "delegation(index)";
        case Usage.CAPABILITY_INVOCATION_KEY:
            return "invocation(index)";
        default:
            return "unknown(index)";
    }
}
exports.getUsageId = getUsageId;
function getUsage(protosUsage) {
    let usage;
    switch (protosUsage) {
        case 0:
            usage = Usage.UNKNOWN_KEY;
            break;
        case 1:
            usage = Usage.MASTER_KEY;
            break;
        case 2:
            usage = Usage.ISSUING_KEY;
            break;
        case 3:
            usage = Usage.KEY_AGREEMENT_KEY;
            break;
        case 4:
            usage = Usage.AUTHENTICATION_KEY;
            break;
        case 5:
            usage = Usage.REVOCATION_KEY;
            break;
        case 6:
            usage = Usage.CAPABILITY_INVOCATION_KEY;
            break;
        case 7:
            usage = Usage.CAPABILITY_DELEGATION_KEY;
            break;
        default:
            usage = Usage.UNKNOWN_KEY;
            break;
    }
    return usage;
}
exports.getUsage = getUsage;
class PrismDIDPublicKey {
    apollo;
    id;
    usage;
    keyData;
    constructor(apollo, id, usage, keyData) {
        this.apollo = apollo;
        this.id = id;
        this.usage = usage;
        this.keyData = keyData;
    }
    static fromProto(apollo, proto) {
        const id = proto.id;
        const usage = proto.usage;
        if (!proto.has_compressed_ec_key_data) {
            throw new Errors_1.CastorError.InvalidPublicKeyEncoding();
        }
        const publicKey = {
            keyCurve: {
                curve: models_1.Curve.SECP256K1,
            },
            value: Buffer.from(proto.compressed_ec_key_data.data).toString("hex"),
        };
        return new PrismDIDPublicKey(apollo, id, getUsage(usage), publicKey);
    }
    toProto() {
        const compressed = new Protos.io.iohk.atala.prism.protos.CompressedECKeyData({
            curve: models_1.Curve.SECP256K1,
            data: Buffer.from(this.apollo.compressedPublicKeyFromCompresedData(Buffer.from(this.keyData.value, "hex")).uncompressed.value),
        });
        const usage = getProtosUsage(this.usage);
        const publicKey = new Protos.io.iohk.atala.prism.protos.PublicKey({
            id: this.id,
            usage: usage,
            compressed_ec_key_data: compressed,
        });
        return publicKey;
    }
}
exports.PrismDIDPublicKey = PrismDIDPublicKey;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJpc21ESURQdWJsaWNLZXkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvY2FzdG9yL2RpZC9wcmlzbURJRC9QcmlzbURJRFB1YmxpY0tleS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLG1EQUEwRDtBQUMxRCwwREFBNEQ7QUFFNUQsaUVBQW1EO0FBQ25ELElBQVksS0FTWDtBQVRELFdBQVksS0FBSztJQUNmLGlDQUF3QixDQUFBO0lBQ3hCLG1DQUEwQixDQUFBO0lBQzFCLGlEQUF3QyxDQUFBO0lBQ3hDLHlDQUFnQyxDQUFBO0lBQ2hDLDhEQUFxRCxDQUFBO0lBQ3JELDhEQUFxRCxDQUFBO0lBQ3JELDhDQUFxQyxDQUFBO0lBQ3JDLG1DQUEwQixDQUFBO0FBQzVCLENBQUMsRUFUVyxLQUFLLEdBQUwsYUFBSyxLQUFMLGFBQUssUUFTaEI7QUFFRCxTQUFnQixjQUFjLENBQzVCLEtBQVk7SUFFWixRQUFRLEtBQUssRUFBRTtRQUNiLEtBQUssS0FBSyxDQUFDLFdBQVc7WUFDcEIsT0FBTyxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDO1FBQ2hFLEtBQUssS0FBSyxDQUFDLFVBQVU7WUFDbkIsT0FBTyxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDO1FBQy9ELEtBQUssS0FBSyxDQUFDLFdBQVc7WUFDcEIsT0FBTyxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDO1FBQ2hFLEtBQUssS0FBSyxDQUFDLGlCQUFpQjtZQUMxQixPQUFPLE1BQU0sQ0FBQyxFQUFFLENBQUMsSUFB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