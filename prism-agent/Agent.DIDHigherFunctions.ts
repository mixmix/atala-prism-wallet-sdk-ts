import {
  Apollo,
  Castor,
  Pluto,
  AgentError,
  Curve,
  DID,
  Seed,
  Service,
  ServiceEndpoint,
  Signature,
} from "domain/index.js";
import {
  AgentDIDHigherFunctions as AgentDIDHigherFunctionsClass,
  ConnectionsManager,
  MediatorHandler,
} from "./types/index.js";

export class AgentDIDHigherFunctions implements AgentDIDHigherFunctionsClass {
  constructor(
    protected apollo: Apollo,
    protected castor: Castor,
    protected pluto: Pluto,
    protected manager: ConnectionsManager,
    protected mediationHandler: MediatorHandler,
    protected seed: Seed
  ) {}

  async signWith(did: DID, message: Uint8Array): Promise<Signature> {
    const privateKeys = await this.pluto.getDIDPrivateKeysByDID(did);
    if (!privateKeys || privateKeys.length <= 0) {
      throw new AgentError.CannotFindDIDPrivateKey();
    }
    const [privateKey] = privateKeys;
    return this.apollo.signByteArrayMessage(privateKey, message);
  }

  async createNewPeerDID(
    services: Service[],
    updateMediator: boolean
  ): Promise<DID> {
    const index = await this.pluto.getPrismLastKeyPathIndex();
    const keyAgreementKeyPair = this.apollo.createKeyPairFromKeyCurve(
      {
        curve: Curve.X25519,
        index: index,
      },
      this.seed
    );
    const authenticationKeyPair = this.apollo.createKeyPairFromKeyCurve(
      {
        curve: Curve.ED25519,
        index: index,
      },
      this.seed
    );
    const mediatorDID = this.manager.mediationHandler.mediator?.routingDID;
    const keyPairs = [keyAgreementKeyPair, authenticationKeyPair];

    if (
      updateMediator &&
      mediatorDID &&
      !services.find((service) => {
        return service.isDIDCommMessaging;
      })
    ) {
      //TODO(): This still needs to be done update the key List
      services.push(
        new Service(
          "#didcomm-1",
          ["DIDCommMessaging"],
          new ServiceEndpoint(mediatorDID.toString())
        )
      );
    }

    const did = await this.castor.createPeerDID(keyPairs, services);

    if (updateMediator) {
      await this.mediationHandler.updateKeyListWithDIDs([did]);
    }

    this.pluto.storePeerDID(did, [
      keyAgreementKeyPair.privateKey,
      authenticationKeyPair.privateKey,
    ]);

    return did;
  }

  async createNewPrismDID(
    alias: string,
    services: Service[],
    keyPathIndex?: number
  ): Promise<DID> {
    const index = keyPathIndex
      ? keyPathIndex
      : await this.pluto.getPrismLastKeyPathIndex();
    const keyPair = this.apollo.createKeyPairFromKeyCurve(
      {
        curve: Curve.SECP256K1,
        index: index,
      },
      this.seed
    );
    const did = await this.castor.createPrismDID(keyPair.publicKey, services);
    await this.pluto.storePrismDID(did, index, keyPair.privateKey, null, alias);
    return did;
  }
}
