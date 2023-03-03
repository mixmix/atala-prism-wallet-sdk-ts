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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bip39 = __importStar(require("@scure/bip39"));
const english_1 = require("@scure/bip39/wordlists/english");
const elliptic_1 = __importDefault(require("elliptic"));
const domain_1 = require("../domain");
const Mnemonic_1 = require("../domain/models/errors/Mnemonic");
const EC = elliptic_1.default.ec;
const EDDSA = elliptic_1.default.eddsa;
const ec = new EC("secp256k1");
const eddsa = new EDDSA("ed25519");
class Apollo {
    getKeyPairForCurve(seed, curve) {
        if (curve.curve == domain_1.Curve.SECP256K1 || curve.curve == domain_1.Curve.X25519) {
            const keyPair = ec.genKeyPair({ entropy: Buffer.from(seed.value) });
            return {
                keyCurve: curve,
                privateKey: {
                    keyCurve: curve,
                    value: keyPair.getPrivate("hex"),
                },
                publicKey: {
                    keyCurve: curve,
                    value: keyPair.getPublic().encode("hex", false),
                },
            };
        }
        else if (curve.curve == domain_1.Curve.ED25519) {
            const prv = eddsa.keyFromSecret(Buffer.from(seed.value));
            return {
                keyCurve: curve,
                privateKey: {
                    keyCurve: curve,
                    value: prv.getSecret("hex"),
                },
                publicKey: {
                    keyCurve: curve,
                    value: prv.getPublic("hex"),
                },
            };
        }
        else {
            throw new Error("Method not implemented.");
        }
    }
    createRandomMnemonics() {
        return bip39.generateMnemonic(english_1.wordlist, 256).split(" ");
    }
    createSeed(mnemonics, passphrase) {
        const mnemonicString = mnemonics.join(" ");
        if (mnemonics.length % 3 != 0) {
            throw new Mnemonic_1.MnemonicLengthException("Word list size must be multiple of three words");
        }
        else if (mnemonics.length <= 0) {
            throw new Mnemonic_1.MnemonicLengthException("Word list is empty");
        }
        if (!bip39.validateMnemonic(mnemonicString, english_1.wordlist)) {
            throw new Mnemonic_1.MnemonicWordException(`Invalid mnemonic word/s`);
        }
        const seed = bip39.mnemonicToSeedSync(mnemonicString, passphrase);
        return {
            value: seed,
        };
    }
    createRandomSeed(passphrase) {
        const mnemonics = this.createRandomMnemonics();
        const seed = this.createSeed(mnemonics, passphrase);
        return {
            seed: seed,
            mnemonics: mnemonics,
        };
    }
    createKeyPairFromKeyCurve(seed, curve) {
        return this.getKeyPairForCurve(seed, curve);
    }
    createKeyPairFromPrivateKey(seed, privateKey) {
        return this.getKeyPairForCurve(seed, privateKey.keyCurve);
    }
    compressedPublicKeyFromPublicKey(publicKey) {
        const keyPair = ec.keyFromPublic(Buffer.from(publicKey.value, "hex"));
        return {
            uncompressed: {
                keyCurve: {
                    curve: domain_1.Curve.SECP256K1,
                },
                value: keyPair.getPublic().encode("hex", true),
            },
            value: keyPair.getPublic().encode("hex", true),
        };
    }
    compressedPublicKeyFromCompresedData(compressedData) {
        const point = ec.curve.decodePoint(compressedData).encode("hex");
        const keyPair = ec.keyFromPublic(Buffer.from(point, "hex"));
        return {
            uncompressed: {
                keyCurve: {
                    curve: domain_1.Curve.SECP256K1,
                },
                value: keyPair.getPublic().encode("hex", true),
            },
            value: keyPair.getPublic().encode("hex", true),
        };
    }
    publicKeyFromPoints(curve, x, y) {
        const publicKey = ec.keyFromPublic({
            x: Buffer.from(x).toString("hex"),
            y: Buffer.from(y).toString("hex"),
        });
        return {
            keyCurve: curve,
            value: publicKey.getPublic().encode("hex", true),
        };
    }
    publicKeyFromPoint(curve, x) {
        const publicKey = ec.keyFromPublic(Buffer.from(x));
        return {
            keyCurve: curve,
            value: publicKey.getPublic().encode("hex", true),
        };
    }
    signByteArrayMessage(privateKey, message) {
        const messageBuffer = Buffer.from(message);
        if (privateKey.keyCurve.curve == domain_1.Curve.ED25519) {
            const keyPair = eddsa.keyFromSecret(Buffer.from(privateKey.value));
            return {
                value: keyPair.sign(messageBuffer).toBytes(),
            };
        }
        else if (privateKey.keyCurve.curve == domain_1.Curve.SECP256K1 ||
            privateKey.keyCurve.curve == domain_1.Curve.X25519) {
            const keyPair = ec.keyFromPrivate(privateKey.value, "hex");
            return {
                value: Buffer.from(keyPair.sign(messageBuffer).toDER()),
            };
        }
        throw new Error("Method not implemented.");
    }
    signStringMessage(privateKey, message) {
        return this.signByteArrayMessage(privateKey, Buffer.from(message));
    }
    verifySignature(publicKey, challenge, signature) {
        const challengeBuffer = Buffer.from(challenge);
        const signatureBuffer = Buffer.from(signature.value);
        if (publicKey.keyCurve.curve == domain_1.Curve.ED25519) {
            return eddsa.verify(challengeBuffer, signatureBuffer, publicKey.value);
        }
        else if (publicKey.keyCurve.curve == domain_1.Curve.SECP256K1 ||
            publicKey.keyCurve.curve == domain_1.Curve.X25519) {
            return ec.verify(challengeBuffer, signatureBuffer, Buffer.from(publicKey.value, "hex"));
        }
        throw new Error("Method not implemented.");
    }
}
exports.default = Apollo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBvbGxvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2Fwb2xsby9BcG9sbG8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLG9EQUFzQztBQUN0Qyw0REFBMEQ7QUFFMUQsd0RBQWdDO0FBQ2hDLHNDQVVtQjtBQUVuQiwrREFHMEM7QUFFMUMsTUFBTSxFQUFFLEdBQUcsa0JBQVEsQ0FBQyxFQUFFLENBQUM7QUFDdkIsTUFBTSxLQUFLLEdBQUcsa0JBQVEsQ0FBQyxLQUFLLENBQUM7QUFFN0IsTUFBTSxFQUFFLEdBQUcsSUFBSSxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDL0IsTUFBTSxLQUFLLEdBQUcsSUFBSSxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7QUFFbkMsTUFBcUIsTUFBTTtJQUNqQixrQkFBa0IsQ0FBQyxJQUFVLEVBQUUsS0FBZTtRQUNwRCxJQUFJLEtBQUssQ0FBQyxLQUFLLElBQUksY0FBSyxDQUFDLFNBQVMsSUFBSSxLQUFLLENBQUMsS0FBSyxJQUFJLGNBQUssQ0FBQyxNQUFNLEVBQUU7WUFDakUsTUFBTSxPQUFPLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDcEUsT0FBTztnQkFDTCxRQUFRLEVBQUUsS0FBSztnQkFDZixVQUFVLEVBQUU7b0JBQ1YsUUFBUSxFQUFFLEtBQUs7b0JBQ2YsS0FBSyxFQUFFLE9BQU8sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDO2lCQUNqQztnQkFDRCxTQUFTLEVBQUU7b0JBQ1QsUUFBUSxFQUFFLEtBQUs7b0JBQ2YsS0FBSyxFQUFFLE9BQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQztpQkFDaEQ7YUFDRixDQUFDO1NBQ0g7YUFB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