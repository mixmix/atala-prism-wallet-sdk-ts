import { VerifiableCredential } from "../models/VerifiableCredential.js";

export interface Pollux {
  parseVerifiableCredential: (jwtString: string) => VerifiableCredential;
}
