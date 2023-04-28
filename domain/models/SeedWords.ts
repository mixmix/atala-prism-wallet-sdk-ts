import { Seed } from "./Seed.js";
import { MnemonicWordList } from "./WordList.js";

export interface SeedWords {
  mnemonics: MnemonicWordList;
  seed: Seed;
}
