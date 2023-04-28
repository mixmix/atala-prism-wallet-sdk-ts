import { X25519KeyCommon } from "./X25519KeyCommon.js";

export class X25519PublicKey extends X25519KeyCommon {
  constructor(private nativeValue: Uint8Array) {
    super();
  }

  getEncoded(): Buffer {
    return Buffer.from(this.nativeValue);
  }
}
