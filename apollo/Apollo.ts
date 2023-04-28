import {
  Apollo as ApolloInterface,
  MnemonicWordList,
  MnemonicLengthException,
  MnemonicWordException,
  Seed,
  SeedWords,
  KeyCurve,
  KeyPair,
  PrivateKey,
  PublicKey,
  CompressedPublicKey,
  Signature,
  Curve,
} from "domain/index.js";
import * as bip39 from "@scure/bip39";
import { wordlist } from "@scure/bip39/wordlists/english.js";
import * as elliptic from "elliptic";
import { DerivationPath } from "./utils/derivation/DerivationPath.js";
import { KeyDerivation } from "./utils/derivation/KeyDerivation.js";
import { Secp256k1PublicKey } from "./utils/Secp256k1PublicKey.js";
import { Secp256k1PrivateKey } from "./utils/Secp256k1PrivateKey.js";
import { Ed25519PrivateKey } from "./utils/Ed25519PrivateKey.js";
import { Ed25519PublicKey } from "./utils/Ed25519PublicKey.js";
import { Ed25519KeyPair } from "./utils/Ed25519KeyPair.js";
import { X25519KeyPair } from "./utils/X25519KeyPair.js";
import { ApolloError } from "../domain/models/Errors.js";
import { OctetKeyPair } from "./models/OctetKeyPair.js";

const EC = elliptic.ec;

export default class Apollo implements ApolloInterface {
  private getKeyPairForCurve(curve: KeyCurve, seed?: Seed): KeyPair {
    const derivationPath = DerivationPath.fromPath(
      `m/${curve.index || 0}'/0'/0'`
    );
    if (curve.curve == Curve.SECP256K1) {
      if (!seed) {
        throw new Error(
          "Please provide a seed when creating a secp256k1 keypair"
        );
      }
      const extendedKey = KeyDerivation.deriveKey(seed.value, derivationPath);
      const keyPair = extendedKey.keyPair();
      return {
        keyCurve: curve,
        privateKey: {
          keyCurve: curve,
          value: keyPair.privateKey.getEncoded(),
        },
        publicKey: {
          keyCurve: curve,
          value: keyPair.publicKey.getEncoded(),
        },
      };
    } else if (curve.curve == Curve.ED25519) {
      const keyPair = new Ed25519KeyPair();
      return {
        keyCurve: curve,
        privateKey: {
          keyCurve: curve,
          value: keyPair.getPrivate(),
        },
        publicKey: {
          keyCurve: curve,
          value: keyPair.getPublic(),
        },
      };
    } else if (curve.curve == Curve.X25519) {
      const keyPair = new X25519KeyPair();
      return {
        keyCurve: curve,
        privateKey: {
          keyCurve: curve,
          value: keyPair.getPrivate(),
        },
        publicKey: {
          keyCurve: curve,
          value: keyPair.getPublic(),
        },
      };
    } else {
      throw new Error("Method not implemented.");
    }
  }
  createRandomMnemonics(): MnemonicWordList {
    return bip39.generateMnemonic(wordlist, 256).split(" ") as MnemonicWordList;
  }
  createSeed(mnemonics: MnemonicWordList, passphrase?: string): Seed {
    const mnemonicString = mnemonics.join(" ");

    if (mnemonics.length % 3 != 0) {
      throw new MnemonicLengthException(
        "Word list size must be multiple of three words"
      );
    } else if (mnemonics.length <= 0) {
      throw new MnemonicLengthException("Word list is empty");
    }
    if (!bip39.validateMnemonic(mnemonicString, wordlist)) {
      throw new MnemonicWordException(`Invalid mnemonic word/s`);
    }
    const seed = bip39.mnemonicToSeedSync(mnemonicString, passphrase);
    return {
      value: seed,
    };
  }
  createRandomSeed(passphrase?: string): SeedWords {
    const mnemonics = this.createRandomMnemonics();
    const seed = this.createSeed(mnemonics, passphrase);
    return {
      seed: seed,
      mnemonics: mnemonics,
    };
  }
  createKeyPairFromKeyCurve(curve: KeyCurve, seed?: Seed): KeyPair {
    return this.getKeyPairForCurve(curve, seed);
  }
  createKeyPairFromPrivateKey(privateKey: PrivateKey, seed?: Seed): KeyPair {
    return this.getKeyPairForCurve(privateKey.keyCurve, seed);
  }
  compressedPublicKeyFromPublicKey(publicKey: PublicKey): CompressedPublicKey {
    const secp256k1PublicKey = Secp256k1PublicKey.secp256k1FromBytes(
      Buffer.from(publicKey.value)
    );
    return {
      uncompressed: {
        keyCurve: {
          curve: Curve.SECP256K1,
        },
        value: secp256k1PublicKey.getEncoded(),
      },
      value: secp256k1PublicKey.getEncodedCompressed(),
    };
  }
  compressedPublicKeyFromCompressedData(
    compressedData: Uint8Array
  ): CompressedPublicKey {
    const secp256k1PublicKey =
      Secp256k1PublicKey.secp256k1FromCompressed(compressedData);
    return {
      uncompressed: {
        keyCurve: {
          curve: Curve.SECP256K1,
        },
        value: secp256k1PublicKey.getEncoded(),
      },
      value: secp256k1PublicKey.getEncodedCompressed(),
    };
  }
  publicKeyFromPoints(
    curve: KeyCurve,
    x: Uint8Array,
    y: Uint8Array
  ): PublicKey {
    const publicKey = Secp256k1PublicKey.secp256k1FromByteCoordinates(x, y);
    return {
      keyCurve: curve,
      value: publicKey.getEncoded(),
    };
  }
  publicKeyFromPoint(curve: KeyCurve, x: Uint8Array): PublicKey {
    const publicKey = Secp256k1PublicKey.secp256k1FromBytes(x);
    return {
      keyCurve: curve,
      value: publicKey.getEncoded(),
    };
  }
  signByteArrayMessage(privateKey: PrivateKey, message: Uint8Array): Signature {
    const messageBuffer = Buffer.from(message);
    if (privateKey.keyCurve.curve === Curve.ED25519) {
      const ed25519PrivateKey = new Ed25519PrivateKey(
        Buffer.from(privateKey.value)
      );
      return {
        value: Buffer.from(ed25519PrivateKey.sign(messageBuffer)),
      };
    } else if (privateKey.keyCurve.curve === Curve.X25519) {
      throw new ApolloError.InvalidKeyCurve(
        "X25519 key cannot be used for signatures"
      );
    } else if (privateKey.keyCurve.curve === Curve.SECP256K1) {
      const secp256k1PrivateKey = Secp256k1PrivateKey.secp256k1FromBytes(
        privateKey.value
      );
      return {
        value: Buffer.from(secp256k1PrivateKey.sign(messageBuffer)),
      };
    }
    throw new Error("Method not implemented.");
  }
  signStringMessage(privateKey: PrivateKey, message: string): Signature {
    return this.signByteArrayMessage(privateKey, Buffer.from(message));
  }
  getECInstanceByCurve(curve: Curve): elliptic.ec {
    return new EC(curve === Curve.SECP256K1 ? "secp256k1" : "curve25519");
  }
  verifySignature(
    publicKey: PublicKey,
    challenge: Uint8Array,
    signature: Uint8Array
  ): boolean {
    const challengeBuffer = Buffer.from(challenge);
    const signatureBuffer = Buffer.from(signature);
    if (publicKey.keyCurve.curve === Curve.ED25519) {
      const ed25519PublicKey = new Ed25519PublicKey(publicKey.value);
      return ed25519PublicKey.verify(challengeBuffer, signatureBuffer);
    } else if (publicKey.keyCurve.curve === Curve.X25519) {
      throw new ApolloError.InvalidKeyCurve(
        "X25519 key cannot be used for signatures"
      );
    } else if (publicKey.keyCurve.curve === Curve.SECP256K1) {
      const compressed = this.compressedPublicKeyFromPublicKey(publicKey);
      const secp256k1PublicKey = Secp256k1PublicKey.secp256k1FromCompressed(
        compressed.value
      );
      return secp256k1PublicKey.verify(challengeBuffer, signatureBuffer);
    }
    return false;
  }
  getPrivateJWKJson(id: string, keyPair: KeyPair): string {
    const jsonString = new OctetKeyPair(id, keyPair).privateJson;
    return jsonString;
  }
  getPublicJWKJson(id: string, keyPair: KeyPair): string {
    const jsonString = new OctetKeyPair(id, keyPair).publicJson;
    return jsonString;
  }
}
