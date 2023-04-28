import { atom } from "jotai";
import { MnemonicWordList } from "domain/index.js";

export const mnemonicsAtom = atom<MnemonicWordList | undefined>(
  undefined
);
