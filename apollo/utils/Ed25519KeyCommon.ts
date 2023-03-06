import * as elliptic from "elliptic";

const eddsa = new elliptic.eddsa("ed25519");
export abstract class Ed25519KeyCommon {
  public static eddsa = eddsa;
  public eddsa = eddsa;
}
