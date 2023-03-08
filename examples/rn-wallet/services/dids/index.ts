import * as prismWalletSdk from "@input-output-hk/atala-prism-wallet-sdk";
import * as jose from "jose";

const apollo = new prismWalletSdk.Apollo();
const castor = new prismWalletSdk.Castor(apollo);
const { Domain } = prismWalletSdk;

interface DidStorageSlot {
    did: prismWalletSdk.Domain.DID;
    authKeyPair: prismWalletSdk.Domain.KeyPair;
    keyAgreementKeyPair: prismWalletSdk.Domain.KeyPair;
}

const _didStorage: Record<string, DidStorageSlot> = {};

export async function createPeerDid() {
  const seed = apollo.createRandomSeed("my-secret").seed;
  const authKeyPair = apollo.createKeyPairFromKeyCurve(seed, {
    curve: Domain.Curve.ED25519,
  });
  const keyAgreementKeyPair = apollo.createKeyPairFromKeyCurve(seed, {
    curve: Domain.Curve.X25519,
  });

  const peerDID = await castor.createPeerDID(
    [authKeyPair, keyAgreementKeyPair],
    []
  );

  _didStorage[peerDID.toString()] = {did: peerDID, authKeyPair, keyAgreementKeyPair};

  return {authKeyPair, keyAgreementKeyPair, peerDID};
}

export function signWithDid(did: string, message: string): string {
    const didData = _didStorage[did];

    if (!didData) throw new Error("UNKNOWN_DID");

    const signature = apollo.signStringMessage(didData.authKeyPair.privateKey, message);
    return jose.base64url.encode(signature.value);
}

export function removeDid(did: string): void {
    delete _didStorage[did];
}
