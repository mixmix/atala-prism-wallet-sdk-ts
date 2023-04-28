import * as BN from "bn.js";
import { expect, assert } from "chai";

import { Secp256k1KeyPair } from "apollo/utils/Secp256k1KeyPair.js";
import Apollo from "apollo/Apollo.js";
import { ECConfig } from "config/ECConfig.js";
import { Curve, ApolloError, MnemonicWordList } from "domain/index.js";
import { bip39Vectors } from "./derivation/BipVectors.js";
import { Secp256k1PrivateKey } from "apollo/utils/Secp256k1PrivateKey.js";

let apollo: Apollo;

describe("Apollo Tests", () => {
  beforeEach(() => {
    apollo = new Apollo();
  });

  it("It should test random mnemonic generation length always matches 24", () => {
    for (let i = 1; i <= 10; i++) {
      expect(apollo.createRandomMnemonics().length).to.equal(24);
    }
  });

  it("Should generate random mnemonics", () => {
    const seenWords: string[] = new Array(24);
    for (let i = 1; i <= 300; i++) {
      seenWords.push(
        ...apollo
          .createRandomMnemonics()
          .filter((newWord) => !seenWords.includes(newWord))
      );
    }
    // with great probability we'll see at least 75% of words after 3600 draws from 2048 possible
    expect(2048 - seenWords.length).to.be.lessThan(512);
  });

  it("Should compute the right binary seed", () => {
    const password = "TREZOR";
    const vectors = JSON.parse(bip39Vectors) as string[][];
    for (const v of vectors) {
      const [, mnemonicPhrase, binarySeedHex] = v;
      const mnemonicCode = mnemonicPhrase.split(" ") as MnemonicWordList;
      const binarySeed = apollo.createSeed(mnemonicCode, password);
      expect(binarySeedHex).to.equal(
        Buffer.from(binarySeed.value).toString("hex")
      );
    }
  });

  it("Should test failure when checksum is incorrect", () => {
    const mnemonicCode = Array(24).fill("abandon") as MnemonicWordList;
    assert.throws(
      () => {
        apollo.createSeed(mnemonicCode, "");
      },
      Error,
      "Invalid mnemonic word/s"
    );
  });

  it("Should test failure when invalid word is used", () => {
    const mnemonicCode = [
      "hocus",
      "pocus",
      "mnemo",
      "codus",
      ...Array(20).fill("abandon"),
    ] as MnemonicWordList;
    assert.throws(
      () => {
        apollo.createSeed(mnemonicCode, "");
      },
      Error,
      "Invalid mnemonic word/s"
    );
  });

  it("Should test failure when wrong mnemonic length is used", () => {
    const mnemonicCode = [] as unknown as MnemonicWordList;
    mnemonicCode.push("abandon");

    assert.throws(
      () => {
        apollo.createSeed(mnemonicCode, "");
      },
      Error,
      "Word list size must be multiple of three words"
    );
  });

  it("Should test secp256k1KeyPair generation", () => {
    const keyPair = Secp256k1KeyPair.generateSecp256k1KeyPair();
    expect(keyPair.privateKey.getEncoded().length).to.equal(
      ECConfig.PRIVATE_KEY_BYTE_SIZE
    );
    expect(
      Buffer.from(keyPair.privateKey.getEncoded()).toString("hex").length
    ).to.equal(ECConfig.PRIVATE_KEY_BYTE_SIZE * 2);
    expect(keyPair.publicKey.getEncoded().length).to.equal(
      ECConfig.PUBLIC_KEY_BYTE_SIZE
    );
    expect(
      Buffer.from(keyPair.publicKey.getEncoded()).toString("hex").length
    ).to.equal(ECConfig.PUBLIC_KEY_BYTE_SIZE * 2);
  });

  it("Should create a private key from encoded", () => {
    const keyPair = Secp256k1KeyPair.generateSecp256k1KeyPair();
    const encodedPrivateKey = keyPair.privateKey.getEncoded();
    const d = new BN.BN(encodedPrivateKey);

    const newFromBytes =
      Secp256k1PrivateKey.secp256k1FromBytes(encodedPrivateKey);
    const newFromBigInteger = Secp256k1PrivateKey.secp256k1FromBigInteger(d);

    expect(keyPair.privateKey.nativeValue.toArray()).to.deep.equal(
      newFromBytes.nativeValue.toArray()
    );
    expect(keyPair.privateKey.nativeValue.toArray()).to.deep.equal(
      newFromBigInteger.nativeValue.toArray()
    );
  });

  it("Should create and Sign and verify a message using Secp256k1 KeyPair", async () => {
    const text = Buffer.from("AtalaPrism Wallet SDK");
    const apollo = new Apollo();
    const seed = apollo.createRandomSeed().seed;
    const keyPair = apollo.createKeyPairFromKeyCurve(
      {
        curve: Curve.SECP256K1,
      },
      seed
    );
    const signature = apollo.signByteArrayMessage(keyPair.privateKey, text);
    const verified = apollo.verifySignature(
      keyPair.publicKey,
      text,
      signature.value
    );
    expect(verified).to.be.equal(true);
  });

  it("Should only verify signed message using the correct SECP256K1 KeyPair", async () => {
    const text = Buffer.from("AtalaPrism Wallet SDK");
    const apollo = new Apollo();
    const seed = apollo.createRandomSeed().seed;
    const keyPair = apollo.createKeyPairFromKeyCurve(
      {
        curve: Curve.SECP256K1,
      },
      seed
    );
    const wrongKeyPair = apollo.createKeyPairFromKeyCurve(
      {
        curve: Curve.SECP256K1,
      },
      apollo.createRandomSeed().seed
    );
    const signature = apollo.signByteArrayMessage(keyPair.privateKey, text);
    const verified = apollo.verifySignature(
      wrongKeyPair.publicKey,
      text,
      signature.value
    );
    expect(verified).to.be.equal(false);
  });

  it("Should create and Sign and verify a message using ED25519 KeyPair", async () => {
    const text = Buffer.from("AtalaPrism Wallet SDK");
    const apollo = new Apollo();
    const seed = apollo.createRandomSeed().seed;
    const keyPair = apollo.createKeyPairFromKeyCurve(
      {
        curve: Curve.ED25519,
      },
      seed
    );
    const signature = apollo.signByteArrayMessage(keyPair.privateKey, text);
    const verified = apollo.verifySignature(
      keyPair.publicKey,
      text,
      signature.value
    );
    expect(verified).to.be.equal(true);
  });

  it("Should only verify signed message using the correct ED25519 KeyPair", async () => {
    const text = Buffer.from("AtalaPrism Wallet SDK");
    const apollo = new Apollo();
    const seed = apollo.createRandomSeed().seed;
    const keyPair = apollo.createKeyPairFromKeyCurve(
      {
        curve: Curve.ED25519,
      },
      seed
    );
    const wrongKeyPair = apollo.createKeyPairFromKeyCurve(
      {
        curve: Curve.ED25519,
      },
      apollo.createRandomSeed().seed
    );
    const signature = apollo.signByteArrayMessage(keyPair.privateKey, text);
    const verified = apollo.verifySignature(
      wrongKeyPair.publicKey,
      text,
      signature.value
    );
    expect(verified).to.be.equal(false);
  });

  it("Throws error when sign and verify is attempted with X25519 KeyPair", async () => {
    const text = Buffer.from("AtalaPrism Wallet SDK");
    const apollo = new Apollo();
    const seed = apollo.createRandomSeed().seed;
    const keyPair = apollo.createKeyPairFromKeyCurve(
      {
        curve: Curve.X25519,
      },
      seed
    );

    expect(() =>
      apollo.signByteArrayMessage(keyPair.privateKey, text)
    ).to.throw(ApolloError.InvalidKeyCurve);

    expect(() =>
      apollo.verifySignature(keyPair.publicKey, text, new Uint8Array())
    ).to.throw(ApolloError.InvalidKeyCurve);
  });
});
