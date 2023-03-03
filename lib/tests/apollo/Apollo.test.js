"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const Apollo_1 = __importDefault(require("../../src/apollo/Apollo"));
const ECConfig_1 = require("../../src/config/ECConfig");
const models_1 = require("../../src/domain/models");
const BipVectors_1 = require("./derivation/BipVectors");
let apollo;
let keyPair;
describe("Apollo Tests", () => {
    beforeEach(() => {
        apollo = new Apollo_1.default();
    });
    it("It should test random mnemonic generation length always matches 24", () => {
        for (let i = 1; i <= 10; i++) {
            (0, chai_1.expect)(apollo.createRandomMnemonics().length).to.equal(24);
        }
    });
    it("Should generate random mnemonics", () => {
        const seenWords = new Array(24);
        for (let i = 1; i <= 300; i++) {
            seenWords.push(...apollo
                .createRandomMnemonics()
                .filter((newWord) => !seenWords.includes(newWord)));
        }
        // with great probability we'll see at least 75% of words after 3600 draws from 2048 possible
        (0, chai_1.expect)(2048 - seenWords.length).to.be.lessThan(512);
    });
    it("Should compute the right binary seed", () => {
        const password = "TREZOR";
        const vectors = JSON.parse(BipVectors_1.bip39Vectors);
        for (const v of vectors) {
            const [, mnemonicPhrase, binarySeedHex] = v;
            const mnemonicCode = mnemonicPhrase.split(" ");
            const binarySeed = apollo.createSeed(mnemonicCode, password);
            (0, chai_1.expect)(binarySeedHex).to.equal(Buffer.from(binarySeed.value).toString("hex"));
        }
    });
    it("Should test failure when checksum is incorrect", () => {
        const mnemonicCode = Array(24).fill("abandon");
        chai_1.assert.throws(() => {
            apollo.createSeed(mnemonicCode, "");
        }, Error, "Invalid mnemonic word/s");
    });
    it("Should test failure when invalid word is used", () => {
        const mnemonicCode = [
            "hocus",
            "pocus",
            "mnemo",
            "codus",
            ...Array(20).fill("abandon"),
        ];
        chai_1.assert.throws(() => {
            apollo.createSeed(mnemonicCode, "");
        }, Error, "Invalid mnemonic word/s");
    });
    it("Should test failure when wrong mnemonic length is used", () => {
        const mnemonicCode = [];
        mnemonicCode.push("abandon");
        chai_1.assert.throws(() => {
            apollo.createSeed(mnemonicCode, "");
        }, Error, "Word list size must be multiple of three words");
        describe("Tests with keyPair", () => {
            beforeEach(() => {
                keyPair = apollo.createKeyPairFromKeyCurve(apollo.createRandomSeed().seed, {
                    curve: models_1.Curve.SECP256K1,
                });
            });
            it("Should test secp256k1 keypair generation", () => {
                (0, chai_1.expect)(Buffer.from(keyPair.publicKey.value, "hex").length).to.equal(ECConfig_1.ECConfig.PUBLIC_KEY_BYTE_SIZE);
                (0, chai_1.expect)(Buffer.from(keyPair.privateKey.value, "hex").length).to.equal(ECConfig_1.ECConfig.PRIVATE_KEY_BYTE_SIZE);
            });
            it("Should sign and verify a message", () => {
                const text = "The quick brown fox jumps over the lazy dog";
                const signature = apollo.signStringMessage(keyPair.privateKey, text);
                (0, chai_1.expect)(signature.value.length <= ECConfig_1.ECConfig.SIGNATURE_MAX_BYTE_SIZE).to.equal(true);
                (0, chai_1.expect)(apollo.verifySignature(keyPair.publicKey, Buffer.from(text), signature)).to.equal(true);
            });
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBvbGxvLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi90ZXN0cy9hcG9sbG8vQXBvbGxvLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSwrQkFBc0M7QUFDdEMscUVBQTZDO0FBQzdDLHdEQUFxRDtBQUNyRCxvREFBeUQ7QUFFekQsd0RBQXVEO0FBRXZELElBQUksTUFBYyxDQUFDO0FBQ25CLElBQUksT0FBZ0IsQ0FBQztBQUVyQixRQUFRLENBQUMsY0FBYyxFQUFFLEdBQUcsRUFBRTtJQUM1QixVQUFVLENBQUMsR0FBRyxFQUFFO1FBQ2QsTUFBTSxHQUFHLElBQUksZ0JBQU0sRUFBRSxDQUFDO0lBQ3hCLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLG9FQUFvRSxFQUFFLEdBQUcsRUFBRTtRQUM1RSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzVCLElBQUEsYUFBTSxFQUFDLE1BQU0sQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDNUQ7SUFDSCxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxrQ0FBa0MsRUFBRSxHQUFHLEVBQUU7UUFDMUMsTUFBTSxTQUFTLEdBQWEsSUFBSSxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDMUMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUM3QixTQUFTLENBQUMsSUFBSSxDQUNaLEdBQUcsTUFBTTtpQkFDTixxQkFBcUIsRUFBRTtpQkFDdkIsTUFBTSxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FDckQsQ0FBQztTQUNI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