import { KeyCurve } from "./KeyCurve.js";

export interface PrivateKey {
  keyCurve: KeyCurve;
  value: Uint8Array;
}
