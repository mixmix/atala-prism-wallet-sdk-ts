import { DID } from "./DID.js";
import {
  CredentialSubject,
  CredentialType,
  VerifiableCredential,
  VerifiableCredentialTypeContainer,
} from "./VerifiableCredential.js";

export class JWTVerifiableCredential {
  constructor(
    public subject: CredentialSubject,
    public context: Array<string> = [],
    public type: Array<string> = [],
    public credentialSchema: VerifiableCredentialTypeContainer,
    public credentialSubject: CredentialSubject,
    public credentialStatus: VerifiableCredentialTypeContainer,
    public refreshService: VerifiableCredentialTypeContainer,
    public evidence: VerifiableCredentialTypeContainer,
    public termsOfUse: VerifiableCredentialTypeContainer
  ) {}
}

export class JWTVerifiablePayload implements VerifiableCredential {
  credentialType: CredentialType = CredentialType.JWT;

  id?: string | undefined;
  context: string[];
  type: string[];
  credentialSchema?: VerifiableCredentialTypeContainer | undefined;
  credentialSubject: CredentialSubject;
  credentialStatus?: VerifiableCredentialTypeContainer | undefined;
  refreshService: VerifiableCredentialTypeContainer;
  evidence: VerifiableCredentialTypeContainer;
  termsOfUse: VerifiableCredentialTypeContainer;
  issuer: DID;
  subject?: DID;
  issuanceDate: string;
  expirationDate?: string;
  validFrom?: VerifiableCredentialTypeContainer;
  validUntil?: VerifiableCredentialTypeContainer;
  proof?: string | undefined;

  constructor(
    public iss: string,
    public verifiableCredential: JWTVerifiableCredential,
    public jti: string,
    public nbf: number,
    public sub?: string,
    public exp?: number,
    public aud: Array<string> = [],
    public originalJWTString?: string
  ) {
    this.context = verifiableCredential.context;
    this.type = verifiableCredential.type;
    this.id = jti;

    this.issuer = DID.fromString(iss);
    if (sub) {
      this.subject = DID.fromString(sub);
    }
    this.issuanceDate = new Date(nbf).toISOString();
    if (exp) {
      this.expirationDate = new Date(exp).toISOString();
    }
    if (verifiableCredential.credentialSchema) {
      this.credentialSchema = verifiableCredential.credentialSchema;
    }
    this.credentialSubject = verifiableCredential.credentialSubject;
    this.credentialStatus = verifiableCredential.credentialStatus;
    this.refreshService = verifiableCredential.refreshService;
    this.evidence = verifiableCredential.evidence;
    this.termsOfUse = verifiableCredential.termsOfUse;
  }
}
