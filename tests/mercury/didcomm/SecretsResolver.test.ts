import chai from "chai";
import * as sinon from "sinon";
import SinonChai from "sinon-chai";
import Apollo from "apollo/Apollo.js";
import Castor from "castor/Castor.js";
import Pluto from "pluto/Pluto.js";
import * as Domain from "domain/index.js";
import { DIDCommSecretsResolver } from "mercury/didcomm/SecretsResolver.js";
import { Curve } from "domain/index.js";

chai.use(SinonChai);
const expect = chai.expect;

describe("Mercury DIDComm SecretsResolver", () => {
  let sandbox: sinon.SinonSandbox;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });
  afterEach(() => {
    sandbox.restore();
  });

  const makeTestContext = () => {
    const apollo: Pick<
      Apollo,
      "createKeyPairFromPrivateKey" | "getPrivateJWKJson"
    > = {
      createKeyPairFromPrivateKey: (privateKey) => ({
        keyCurve: privateKey.keyCurve,
        privateKey,
        publicKey: privateKey,
      }),
      getPrivateJWKJson: (id) => `${id}`,
    };

    const castor: Pick<Castor, "getEcnumbasis" | "resolveDID"> = {
      getEcnumbasis: (did, keyPair) => `${keyPair.keyCurve.curve}`,
      resolveDID: async () => ({} as Domain.DIDDocument),
    };

    const pluto: Pick<Pluto, "getAllPeerDIDs"> = {
      getAllPeerDIDs: async () => [],
    };

    const secretsResolver = new DIDCommSecretsResolver(
      apollo as Apollo,
      castor as Castor,
      pluto as Pluto
    );

    return { apollo, castor, pluto, secretsResolver };
  };

  describe("find_secrets", () => {
    it("should return matched secret", async () => {
      const ctx = makeTestContext();
      const did = Domain.DID.fromString(
        "did:peer:2.Ez6LSms555YhFthn1WV8ciDBpZm86hK9tp83WojJUmxPGk1hZ.Vz6MkmdBjMyB4TS5UbbQw54szm8yvMMf1ftGV2sQVYAxaeWhE.SeyJpZCI6Im5ldy1pZCIsInQiOiJkbSIsInMiOiJodHRwczovL21lZGlhdG9yLnJvb3RzaWQuY2xvdWQiLCJhIjpbImRpZGNvbW0vdjIiXX0"
      );
      const secret = did.toString();

      sandbox.stub(ctx.pluto, "getAllPeerDIDs").resolves([
        // TODO: update when PeerDID Types are fixed
        { did: secret } as any,
      ]);

      const result = await ctx.secretsResolver.find_secrets([secret]);

      expect(result).to.have.lengthOf(1);
      expect(result).to.contain(secret);
    });

    it("should return matched secret - no duplicates", async () => {
      const ctx = makeTestContext();
      const did = Domain.DID.fromString(
        "did:peer:2.Ez6LSms555YhFthn1WV8ciDBpZm86hK9tp83WojJUmxPGk1hZ.Vz6MkmdBjMyB4TS5UbbQw54szm8yvMMf1ftGV2sQVYAxaeWhE.SeyJpZCI6Im5ldy1pZCIsInQiOiJkbSIsInMiOiJodHRwczovL21lZGlhdG9yLnJvb3RzaWQuY2xvdWQiLCJhIjpbImRpZGNvbW0vdjIiXX0"
      );
      const secret = did.toString();

      sandbox
        .stub(ctx.pluto, "getAllPeerDIDs")
        .resolves([{ did: secret } as any, { did: secret } as any]);

      const result = await ctx.secretsResolver.find_secrets([secret]);

      expect(result).to.have.lengthOf(1);
      expect(result).to.eql([secret]);
    });

    it("should return empty array with unmatched secret", async () => {
      const ctx = makeTestContext();
      const did = Domain.DID.fromString(
        "did:peer:2.Ez6LSms555YhFthn1WV8ciDBpZm86hK9tp83WojJUmxPGk1hZ.Vz6MkmdBjMyB4TS5UbbQw54szm8yvMMf1ftGV2sQVYAxaeWhE.SeyJpZCI6Im5ldy1pZCIsInQiOiJkbSIsInMiOiJodHRwczovL21lZGlhdG9yLnJvb3RzaWQuY2xvdWQiLCJhIjpbImRpZGNvbW0vdjIiXX0"
      );
      const secret = did.toString();

      sandbox.stub(ctx.pluto, "getAllPeerDIDs").resolves([]);

      const result = await ctx.secretsResolver.find_secrets([secret]);

      expect(result).to.have.lengthOf(0);
    });
  });

  describe("get_secret", () => {
    it("should return matched secret", async () => {
      const ctx = makeTestContext();
      const did = Domain.DID.fromString(
        "did:peer:2.Ez6LSms555YhFthn1WV8ciDBpZm86hK9tp83WojJUmxPGk1hZ.Vz6MkmdBjMyB4TS5UbbQw54szm8yvMMf1ftGV2sQVYAxaeWhE.SeyJpZCI6Im5ldy1pZCIsInQiOiJkbSIsInMiOiJodHRwczovL21lZGlhdG9yLnJvb3RzaWQuY2xvdWQiLCJhIjpbImRpZGNvbW0vdjIiXX0"
      );
      const secret = did.toString();
      const publicKeyJwk: Domain.PublicKeyJWK = {
        crv: Domain.Curve.X25519,
        kid: "kid",
        kty: "OKP",
        // TODO: fix when Types are fixed
        x: {
          data: Buffer.from(new Uint8Array()).toString(),
        } as any,
      };
      const ecnum = "ecnum123";
      const peerDid = {
        did: secret,
        curve: Curve.X25519,
        privateKeys: [
          {
            keyCurve: {
              curve: Curve.X25519,
            },
            value: new Uint8Array(),
          },
        ],
      } as any;

      sandbox.stub(ctx.pluto, "getAllPeerDIDs").resolves([peerDid]);

      sandbox
        .stub(ctx.castor, "resolveDID")
        .resolves(
          new Domain.DIDDocument(did, [
            new Domain.VerificationMethods([
              new Domain.VerificationMethod(
                secret,
                "controller",
                "type",
                publicKeyJwk
              ),
            ]),
          ])
        );

      sandbox
        .stub(ctx.apollo, "createKeyPairFromPrivateKey")
        .returns({} as any);

      sandbox.stub(ctx.castor, "getEcnumbasis").returns(ecnum);

      const result = await ctx.secretsResolver.get_secret(secret);
      const [privateKey] = peerDid.privateKeys;

      expect(result).not.to.be.null;
      expect(result).to.eql({
        id: `${secret}#${ecnum}`,
        type: "JsonWebKey2020",
        privateKeyJwk: {
          crv: peerDid.curve,
          kty: "OKP",
          d: privateKey.value.toString(),
          x: (publicKeyJwk.x as any).data.toString(),
        },
      });
    });

    it("should return null when unmatched secret", async () => {
      const ctx = makeTestContext();
      const did = Domain.DID.fromString(
        "did:peer:2.Ez6LSms555YhFthn1WV8ciDBpZm86hK9tp83WojJUmxPGk1hZ.Vz6MkmdBjMyB4TS5UbbQw54szm8yvMMf1ftGV2sQVYAxaeWhE.SeyJpZCI6Im5ldy1pZCIsInQiOiJkbSIsInMiOiJodHRwczovL21lZGlhdG9yLnJvb3RzaWQuY2xvdWQiLCJhIjpbImRpZGNvbW0vdjIiXX0"
      );
      const secret = did.toString();

      sandbox.stub(ctx.pluto, "getAllPeerDIDs").resolves([]);

      const result = await ctx.secretsResolver.get_secret(secret);

      expect(result).to.be.null;
    });
  });
});
