import { default as ApolloInterface } from "../domain/buildingBlocks/Apollo";
import { Seed, SeedWords, KeyCurve, KeyPair, PrivateKey, PublicKey, CompressedPublicKey, Signature } from "../domain";
import { MnemonicWordList } from "../domain/models/WordList";
export default class Apollo implements ApolloInterface {
    private getKeyPairForCurve;
    createRandomMnemonics(): MnemonicWordList;
    createSeed(mnemonics: MnemonicWordList, passphrase?: string): Seed;
    createRandomSeed(passphrase?: string): SeedWords;
    createKeyPairFromKeyCurve(seed: Seed, curve: KeyCurve): KeyPair;
    createKeyPairFromPrivateKey(seed: Seed, privateKey: PrivateKey): KeyPair;
    compressedPublicKeyFromPublicKey(publicKey: PublicKey): CompressedPublicKey;
    compressedPublicKeyFromCompresedData(compressedData: Uint8Array | string): CompressedPublicKey;
    publicKeyFromPoints(curve: KeyCurve, x: Uint8Array, y: Uint8Array): PublicKey;
    publicKeyFromPoint(curve: KeyCurve, x: Uint8Array): PublicKey;
    signByteArrayMessage(privateKey: PrivateKey, message: Uint8Array): Signature;
    signStringMessage(privateKey: PrivateKey, message: string): Signature;
    verifySignature(publicKey: PublicKey, challenge: Uint8Array, signature: Signature): boolean;
}
