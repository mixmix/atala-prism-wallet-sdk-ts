import { KeyCurve } from "./KeyCurve.js";

export interface PublicKey {
  keyCurve: KeyCurve;
  value: Uint8Array;
}

export interface CompressedPublicKey {
  uncompressed: PublicKey;
  value: Uint8Array;
}
