import { KeyCurve } from "./KeyCurve.js";
import { PrivateKey } from "./PrivateKey.js";
import { PublicKey } from "./PublicKey.js";

export interface KeyPair {
  keyCurve: KeyCurve;
  privateKey: PrivateKey;
  publicKey: PublicKey;
}
