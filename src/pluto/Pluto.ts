import type { MangoQuery } from "rxdb";
import * as Domain from "../domain";
import * as Models from "./models";
import { PeerDID } from "../peer-did/PeerDID";
import { repositoryFactory } from "./repositories";

/**
 * Pluto implementation
 * 
 * Structure:
 * - Pluto class is an orchestration layer
 * - Repositories handle mapping Domain <-> Storable Models
 * - Models suggest db structure
 * - Store abstracts db implementation
 * 
 * Pluto:
 * - always handles Domain classes
 * - manage relationships
 * - handle logic and concepts
 * - throw known Errors
 * - return null
 * - naming convention
 *   - (get/store) (Domain name Pluralized) ie getCredentials
 * 
 * Models:
 * - naming convention
 *   - alias for optional names
 *   - name for required identifiers
 *   - dataJson for JSON.stringified objects
 * 
 * Store:
 * - simplified interface
 * - crud interactions
 * - only use Models
 * 
 * 
 * Future:
 *  - versioning
 *  - migrations
 */
export namespace Pluto {
  export interface Store {
    /**
     * Handle any necessary startup.
     * Will be called first before any usage, if provided.
     */
    start?(): Promise<void>;

    /**
     * Run a query to fetch data from the Store
     * 
     * @param name Model name
     * @param query a MangoQuery object, a set of values and operators defining the query
     * 
     * properties within an object will be AND'ed
     * different objects will be OR'd
     * 
     * @example
     * search for a model in TableOne with uuid and name
     * ```ts
     *   store.query("TableOne", { selector: { uuid: "1", name: "eg" }})
     * ```
     * @example
     * search for models in TableOne with uuid of 1 or 2
     * ```ts
     *   store.query("TableOne", { selector: { $or: [{ uuid: "1" }, { uuid: "2" }] }})
     * ```
     * @example
     * search for all models in TableOne
     * ```ts
     *   store.query("TableOne")
     * ```
     * 
     * @returns relevant Models
     */
    query<T extends Models.Model>(name: string, query?: MangoQuery<T>): Promise<T[]>;

    /**
     * Persist new data in the Store.
     * 
     * @param name table name
     * @param model object to save
     */
    insert<T extends Models.Model>(name: string, model: T): Promise<void>;

    /**
     * Updating a new row in the Store
     * @param table 
     * @param model 
     */
    update<T extends Models.Model>(table: string, model: T): Promise<void>;

    /**
     * Deleting a  row in the Store
     * @param table 
     * @param model 
     */
    delete(table: string, uuid: string): Promise<void>;
  }
}

export class Pluto implements Domain.Pluto {
  private Repositories: ReturnType<typeof repositoryFactory>;

  constructor(
    private readonly store: Pluto.Store,
    private readonly keyRestoration: Domain.KeyRestoration
  ) {
    this.Repositories = repositoryFactory(store, keyRestoration);
  }

  async deleteMessage(id: string): Promise<void> {
    const message = await this.Repositories.Messages.findOne({ id });
    //TODO: Improve error handling
    if (message) {
      await this.Repositories.Messages.delete(message.uuid)
    }
  }


  async start(): Promise<void> {
    if (this.store.start !== undefined) {
      await this.store.start();
    }
  }

  /** Credentials **/

  async storeCredential(credential: Domain.Credential): Promise<void> {
    await this.Repositories.Credentials.save(credential);
  }

  async getAllCredentials(): Promise<Domain.Credential[]> {
    return this.Repositories.Credentials.get();
  }


  async revokeCredential(credential: Domain.Credential): Promise<void> {
    if (!credential || !credential.isStorable()) {
      throw new Error("Credential not found or invalid")
    }
    credential.properties.set("revoked", true);
    const credentialModel = await this.Repositories.Credentials.toModel(credential)
    await this.Repositories.Credentials.update(credentialModel)
  }


  /** Credential Metadata **/

  async storeCredentialMetadata(metadata: Domain.CredentialMetadata): Promise<void> {
    await this.Repositories.CredentialMetadata.save(metadata);
  }

  async getCredentialMetadata(name: string): Promise<Domain.CredentialMetadata | null> {
    return await this.Repositories.CredentialMetadata.findOne({ name });
  }


  /** LinkSecret **/

  async storeLinkSecret(linkSecret: Domain.LinkSecret): Promise<void> {
    return await this.Repositories.LinkSecrets.save(linkSecret);
  }

  async getLinkSecret(name: string = Domain.LinkSecret.defaultName): Promise<Domain.LinkSecret | null> {
    return await this.Repositories.LinkSecrets.findOne({ alias: name });
  }


  /** PrivateKeys **/

  async storePrivateKey(privateKey: Domain.PrivateKey): Promise<void> {
    await this.Repositories.Keys.save(privateKey);
  }

  async getDIDPrivateKeysByDID(did: Domain.DID): Promise<Domain.PrivateKey[]> {
    const links = await this.Repositories.DIDKeyLinks.getModels({ selector: { didId: did.uuid } });
    const $or = links.map(x => ({ uuid: x.keyId }));
    const keys = await this.Repositories.Keys.get({ selector: { $or } });

    return keys;
  }

  /** DIDs **/
  /** Prism DIDs **/

  async storePrismDID(did: Domain.DID, privateKey: Domain.PrivateKey, alias?: string): Promise<void> {
    await this.Repositories.DIDs.save(did, alias);
    await this.Repositories.Keys.save(privateKey);

    await this.Repositories.DIDKeyLinks.insert({
      alias,
      didId: did.uuid,
      keyId: privateKey.uuid
    });
  }

  async getAllPrismDIDs(): Promise<Domain.PrismDID[]> {
    const dids = await this.Repositories.DIDs.find({ method: "prism" });
    const results = await Promise.all(dids.map(x => this.getPrismDID(x.uuid)));
    const filtered = results.filter((x): x is Domain.PrismDID => x != null);

    return filtered;
  }

  private async getPrismDID(didId: string): Promise<Domain.PrismDID | null> {
    try {
      const links = await this.Repositories.DIDKeyLinks.getModels({ selector: { didId } });
      const link = this.onlyOne(links);
      const did = await this.Repositories.DIDs.byUUID(link.didId);
      const key = await this.Repositories.Keys.byUUID(link.keyId);

      if (!did || !key) {
        throw new Error("PrismDID not found");
      }

      const prismDID = new Domain.PrismDID(did, key, link.alias);
      return prismDID;
    }
    catch (e) {
      return null;
    }
  }


  /** Peer DIDs **/

  async storePeerDID(did: Domain.DID, privateKeys: Domain.PrivateKey[]): Promise<void> {
    await this.Repositories.DIDs.save(did);
    await Promise.all(privateKeys.map(x => this.Repositories.Keys.save(x)));

    await Promise.all(
      privateKeys.map(x => this.Repositories.DIDKeyLinks.insert({ didId: did.uuid, keyId: x.uuid }))
    );
  }

  async getAllPeerDIDs(): Promise<PeerDID[]> {
    const allDids = await this.Repositories.DIDs.find({ method: "peer" });
    const allLinks = await this.Repositories.DIDKeyLinks.getModels({
      selector: { $or: allDids.map(x => ({ didId: x.uuid })) }
    });
    const allKeys = await this.Repositories.Keys.get({
      selector: { $or: allLinks.map(x => ({ uuid: x.keyId })) }
    });

    const peerDids = allDids.map(did => {
      const keyIds = allLinks.filter(x => x.didId === did.uuid).map(x => x.keyId);
      const keys = allKeys.filter(x => keyIds.includes(x.uuid));

      const peerDid = new PeerDID(
        did,
        // TODO: remove this when PeerDIDs are updated to use PrivateKey
        keys.map(x => ({
          keyCurve: Domain.getKeyCurveByNameAndIndex(x.curve, x.index),
          value: x.getEncoded()
        }))
      );

      return peerDid;
    });

    return peerDids;
  }


  /** Messages **/

  async storeMessage(message: Domain.Message): Promise<void> {
    await this.Repositories.Messages.save(message);
  }

  async storeMessages(messages: Domain.Message[]): Promise<void> {
    await Promise.all(messages.map(x => this.Repositories.Messages.save(x)));
  }

  async getMessage(id: string): Promise<Domain.Message | null> {
    return await this.Repositories.Messages.findOne({ id });
  }

  async getAllMessages(): Promise<Domain.Message[]> {
    return this.Repositories.Messages.get();
  }


  /** DID Pairs **/

  async storeDIDPair(host: Domain.DID, receiver: Domain.DID, alias: string): Promise<void> {
    await this.Repositories.DIDs.save(host);
    await this.Repositories.DIDs.save(receiver);

    await this.Repositories.DIDLinks.insert({
      alias,
      role: Models.DIDLink.role.pair,
      hostId: host.uuid,
      targetId: receiver.uuid
    });
  }

  async getAllDidPairs(): Promise<Domain.DIDPair[]> {
    const links = await this.Repositories.DIDLinks.getModels({ selector: { role: Models.DIDLink.role.pair } });
    const didPairs = await Promise.all(links.map(x => this.mapDIDPairToDomain(x)));
    const filtered = didPairs.filter((x): x is Domain.DIDPair => x != null);

    return filtered;
  }

  async getPairByDID(did: Domain.DID): Promise<Domain.DIDPair | null> {
    const links = await this.Repositories.DIDLinks.getModels({
      selector: {
        $or: [
          { role: Models.DIDLink.role.pair, hostId: did.uuid },
          { role: Models.DIDLink.role.pair, targetId: did.uuid }
        ]
      }
    });

    // ?? this seems presumptuous? couldnt hostDID be re-used?
    const link = this.onlyOne(links);
    const didPair = this.mapDIDPairToDomain(link);

    return didPair;
  }

  async getPairByName(alias: string): Promise<Domain.DIDPair | null> {
    const links = await this.Repositories.DIDLinks.getModels(
      {
        selector: { alias, role: Models.DIDLink.role.pair }
      });
    const link = this.onlyOne(links);
    const didPair = this.mapDIDPairToDomain(link);

    return didPair;
  }

  private async mapDIDPairToDomain(link: Models.DIDLink): Promise<Domain.DIDPair | null> {
    const hostDID = await this.Repositories.DIDs.byUUID(link.hostId);
    const targetDID = await this.Repositories.DIDs.byUUID(link.targetId);
    const alias = link.alias ?? "";

    if (!hostDID || !targetDID) {
      return null;
    }

    const didPair = new Domain.DIDPair(hostDID, targetDID, alias);
    return didPair;
  }


  /** Mediators **/

  async getAllMediators(): Promise<Domain.Mediator[]> {
    const links = await this.Repositories.DIDLinks.getModels({
      selector: {
        $or: [
          { role: Models.DIDLink.role.mediator },
          { role: Models.DIDLink.role.routing },
        ]
      }
    });
    const hostIds = links.map(x => x.hostId).filter((x, i, s) => s.indexOf(x) === i);

    const result = await Promise.all(
      hostIds.map(async hostId => {
        const mediatorLink = links.find(x => x.hostId === hostId && x.role === Models.DIDLink.role.mediator);
        const routingLink = links.find(x => x.hostId === hostId && x.role === Models.DIDLink.role.routing);

        if (!mediatorLink || !routingLink) {
          throw new Error();
        }

        const hostDID = await this.Repositories.DIDs.byUUID(hostId);
        const mediatorDID = await this.Repositories.DIDs.byUUID(mediatorLink.targetId);
        const routingDID = await this.Repositories.DIDs.byUUID(routingLink.targetId);

        if (!hostDID || !mediatorDID || !routingDID) {
          throw new Error();
        }

        const domain: Domain.Mediator = { hostDID, mediatorDID, routingDID };
        return domain;
      })
    );

    return result;
  }

  async storeMediator(mediator: Domain.Mediator): Promise<void> {
    await this.Repositories.DIDs.save(mediator.hostDID);
    await this.Repositories.DIDs.save(mediator.mediatorDID);
    await this.Repositories.DIDs.save(mediator.routingDID);

    await this.Repositories.DIDLinks.insert({
      role: Models.DIDLink.role.mediator,
      hostId: mediator.hostDID.uuid,
      targetId: mediator.mediatorDID.uuid
    });

    await this.Repositories.DIDLinks.insert({
      role: Models.DIDLink.role.routing,
      hostId: mediator.hostDID.uuid,
      targetId: mediator.routingDID.uuid
    });
  }

  private onlyOne<T>(arr: T[]): T {
    const item = arr.at(0);
    if (!item || arr.length !== 1) throw new Error("something wrong");

    return item;
  }
}
