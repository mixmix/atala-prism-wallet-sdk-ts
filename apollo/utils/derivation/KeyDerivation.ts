import { fromSeed } from "bip32";

import { DerivationAxis } from "./DerivationAxis.js";
import { DerivationPath } from "./DerivationPath.js";
import { ExtendedKey } from "./ExtendedKey.js";

export class KeyDerivation {
  static deriveKey(seed: Uint8Array, path: DerivationPath) {
    const bip32Instance = fromSeed(Buffer.from(seed));
    return path.axes.reduce(
      (key: ExtendedKey, axis: DerivationAxis) => key.derive(axis),
      new ExtendedKey(bip32Instance, DerivationPath.empty())
    );
  }
}
