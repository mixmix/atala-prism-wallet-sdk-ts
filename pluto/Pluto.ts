import "reflect-metadata";
import {
  DID,
  DIDPair,
  getKeyCurveByNameAndIndex,
  Mediator,
  Message,
  PeerDID,
  Pluto as PlutoInterface,
  PrismDIDInfo,
  PrivateKey,
  VerifiableCredential
} from "domain/index.js";
import {DataSource, Like, Repository} from "typeorm";
import * as entities from "./entities/index.js";
import { Did } from "./entities/DID.js";
import {MysqlConnectionOptions} from "typeorm/driver/mysql/MysqlConnectionOptions.js";
import {PostgresConnectionOptions} from "typeorm/driver/postgres/PostgresConnectionOptions.js";
import {CockroachConnectionOptions} from "typeorm/driver/cockroachdb/CockroachConnectionOptions.js";
import {SqliteConnectionOptions} from "typeorm/driver/sqlite/SqliteConnectionOptions.js";
import {SqlServerConnectionOptions} from "typeorm/driver/sqlserver/SqlServerConnectionOptions.js";
import {SapConnectionOptions} from "typeorm/driver/sap/SapConnectionOptions.js";
import {OracleConnectionOptions} from "typeorm/driver/oracle/OracleConnectionOptions.js";
import {CordovaConnectionOptions} from "typeorm/driver/cordova/CordovaConnectionOptions.js";
import {NativescriptConnectionOptions} from "typeorm/driver/nativescript/NativescriptConnectionOptions.js";
import {SqljsConnectionOptions} from "typeorm/driver/sqljs/SqljsConnectionOptions.js";
import {MongoConnectionOptions} from "typeorm/driver/mongodb/MongoConnectionOptions.js";
import {AuroraMysqlConnectionOptions} from "typeorm/driver/aurora-mysql/AuroraMysqlConnectionOptions.js";
import {AuroraPostgresConnectionOptions} from "typeorm/driver/aurora-postgres/AuroraPostgresConnectionOptions.js";
import {ExpoConnectionOptions} from "typeorm/driver/expo/ExpoConnectionOptions.js";
import {BetterSqlite3ConnectionOptions} from "typeorm/driver/better-sqlite3/BetterSqlite3ConnectionOptions.js";
import {CapacitorConnectionOptions} from "typeorm/driver/capacitor/CapacitorConnectionOptions.js";
import {SpannerConnectionOptions} from "typeorm/driver/spanner/SpannerConnectionOptions.js";

type IgnoreProps = "entries" | "entityPrefix" | "metadataTableName";
export type PlutoConnectionProps =
  | Omit<MysqlConnectionOptions, IgnoreProps>
  | Omit<PostgresConnectionOptions, IgnoreProps>
  | Omit<CockroachConnectionOptions, IgnoreProps>
  | Omit<SqliteConnectionOptions, IgnoreProps>
  | Omit<SqlServerConnectionOptions, IgnoreProps>
  | Omit<SapConnectionOptions, IgnoreProps>
  | Omit<OracleConnectionOptions, IgnoreProps>
  | Omit<CordovaConnectionOptions, IgnoreProps>
  | Omit<NativescriptConnectionOptions, IgnoreProps>
  | Omit<SqljsConnectionOptions, IgnoreProps>
  | Omit<MongoConnectionOptions, IgnoreProps>
  | Omit<AuroraMysqlConnectionOptions, IgnoreProps>
  | Omit<AuroraPostgresConnectionOptions, IgnoreProps>
  | Omit<ExpoConnectionOptions, IgnoreProps>
  | Omit<BetterSqlite3ConnectionOptions, IgnoreProps>
  | Omit<CapacitorConnectionOptions, IgnoreProps>
  | Omit<SpannerConnectionOptions, IgnoreProps>;

export default class Pluto implements PlutoInterface {
  dataSource: DataSource;

  constructor(connection: PlutoConnectionProps) {
    const presetSqlJSConfig =
      connection.type === "sqljs"
        ? {
          location: "pluto",
          useLocalForage: true,
          sqlJsConfig: {
            locateFile: (file: string) => `https://sql.js.org/dist/${file}`,
          },
        }
        : {};
    this.dataSource = new DataSource({
      ...presetSqlJSConfig,
      ...connection,
      entities: Object.values(entities),
      synchronize: true,
    });
  }

  private static transformMessageDBToInterface(
    item: entities.Message
  ): Message {
    const jsonData = JSON.parse(item.dataJson);
    return {
      from: DID.fromString(item.from),
      to: DID.fromString(item.to),
      thid: item.thid,
      direction: item.isReceived,
      piuri: jsonData.piuri,
      id: item.id,
      expiresTimePlus: jsonData.expiresTimePlus,
      extraHeaders: jsonData.extraHeaders,
      createdTime: jsonData.createdTime,
      body: jsonData.body,
      ack: jsonData.ack,
      attachments: jsonData.attachments,
      fromPrior: jsonData.fromPrior,
      pthid: jsonData.pthid,
    };
  }

  async start() {
    if (this.dataSource.isInitialized) {
      throw new Error("Database is already initialised");
    }
    try {
      await this.dataSource.initialize();
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async storePrismDID(
    did: DID,
    keyPathIndex: number,
    privateKey: PrivateKey,
    privateKeyMetaId: string | null,
    alias?: string
  ) {
    const didEntity = new entities.Did();
    didEntity.did = did.toString();
    didEntity.method = did.method;
    didEntity.methodId = did.methodId;
    didEntity.schema = did.schema;
    didEntity.alias = alias ?? "";
    await this.dataSource.manager.save(didEntity);
    await this.storePrivateKeys(
      privateKey,
      did,
      keyPathIndex,
      privateKeyMetaId
    );
  }

  async storePeerDID(did: DID, privateKeys: PrivateKey[]) {
    const didEntity = new entities.Did();
    didEntity.did = did.toString();
    didEntity.method = did.method;
    didEntity.methodId = did.methodId;
    didEntity.schema = did.schema;
    didEntity.alias = null;
    await this.dataSource.manager.save(didEntity);
    await Promise.all(
      privateKeys.map((privateKey) =>
        this.storePrivateKeys(
          privateKey,
          did,
          privateKey.keyCurve?.index ?? 0,
          null
        )
      )
    );
  }

  async storeDIDPair(host: DID, receiver: DID, name: string) {
    // const hostInfo = await this.getDIDInfoByDID(host);
    // const receiverInfo = await this.getDIDInfoByDID(receiver);
    // if (!hostInfo) {
    //   throw new Error("Your host DID is not stored, therefore can't store didPair");
    // }
    // if (!receiverInfo) {
    //   throw new Error("Your receiver DID is not stored, therefore can't store didPair");
    // }
    const didPairEntity = new entities.DidPair();
    didPairEntity.id = `${host.toString()}${receiver.toString()}`;
    didPairEntity.name = name;
    didPairEntity.hostDID = host.toString();
    didPairEntity.receiverDID = receiver.toString();

    await this.dataSource.manager.save(didPairEntity);
  }

  async storeMessage(message: Message) {
    const messageEntity = new entities.Message();
    messageEntity.createdTime = message.createdTime;
    messageEntity.dataJson = JSON.stringify(message);
    messageEntity.from = message.from?.toString() ?? "";
    messageEntity.thid = message.thid;
    messageEntity.to = message.to?.toString() ?? "";
    messageEntity.type = message.piuri ?? null;
    messageEntity.isReceived = message.direction;
    await this.dataSource.manager.save(messageEntity);
  }

  async storeMessages(messages: Message[]) {
    await Promise.all(messages.map(this.storeMessage.bind(this)));
  }

  async storePrivateKeys(
    privateKey: PrivateKey,
    did: DID,
    keyPathIndex: number,
    metaId: string | null
  ) {
    const privateKeysEntity = new entities.PrivateKey();
    metaId && (privateKeysEntity.id = metaId); // question: Where should I store metaId
    privateKeysEntity.curve = privateKey.keyCurve.curve;
    privateKeysEntity.privateKey = Buffer.from(privateKey.value).toString();
    privateKeysEntity.keyPathIndex = keyPathIndex ?? 0;
    privateKeysEntity.didId = did.toString();
    await this.dataSource.manager.save(privateKeysEntity);
  }

  async storeMediator(mediator: DID, host: DID, routing: DID) {
    // const mediatorInfo = await this.getDIDInfoByDID(mediator);
    // const hostInfo = await this.getDIDInfoByDID(host);
    // const routingInfo = await this.getDIDInfoByDID(routing);
    //
    // if (!hostInfo) {
    //   throw new Error("Your host DID is not stored, therefore can't store didPair");
    // }
    // if (!mediatorInfo) {
    //   throw new Error("Your mediator DID is not stored, therefore can't store didPair");
    // }
    // if (!routingInfo) {
    //   throw new Error("Your routing DID is not stored, therefore can't store didPair");
    // }
    const mediatorEntity = new entities.Mediator();
    mediatorEntity.mediatorDidId = mediator.toString();
    mediatorEntity.hostDidId = host.toString();
    mediatorEntity.routingDidId = routing.toString();
    await this.dataSource.manager.save(mediatorEntity);
  }

  async getAllPrismDIDs() {
    const didRepository = this.dataSource.manager.getRepository("did");
    try {
      const dids: (Did & Record<"keyPathIndex", number>)[] = await didRepository
        .createQueryBuilder("did")
        .innerJoin("private_key", "private_key", "did.did = private_key.didId")
        .select("did.*, private_key.keyPathIndex")
        .where("did.method = :method", {method: "prism"})
        .getRawMany();
      return dids.map((item) => ({
        did: DID.fromString(item.did),
        alias: item.alias,
        keyPathIndex: item.keyPathIndex,
      })) as PrismDIDInfo[];
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async getDIDInfoByDID(did: DID) {
    const didRepository = this.dataSource.manager.getRepository("did");
    try {
      const didResponse: (Did & Record<"keyPathIndex", number>) | undefined =
        await didRepository
          .createQueryBuilder("did")
          .innerJoin(
            "private_key",
            "private_key",
            "did.did = private_key.didId"
          )
          .select("did.*, privateKey.keyPathIndex", "keyPathIndex")
          .from((subQuery) => {
            return subQuery
              .select("pk.didId", "didId")
              .addSelect("pk.keyPathIndex", "keyPathIndex")
              .from("private_key", "pk")
              .where("pk.didId LIKE :didId", {didId: did.toString() + "%"});
          }, "privateKey")
          .where("did.did LIKE :didId", {didId: did.toString() + "%"})
          .getRawOne();
      if (!didResponse) {
        return null;
      }
      return {
        did: DID.fromString(didResponse?.did ?? ""),
        alias: didResponse.alias,
        keyPathIndex: didResponse.keyPathIndex,
      } as PrismDIDInfo;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async getDIDInfoByAlias(alias: string) {
    const didRepository = this.dataSource.manager.getRepository("did");
    try {
      const didResponse: (Did & Record<"private_key_keyPathIndex", number>)[] =
        await didRepository
          .createQueryBuilder("did")
          .innerJoin(
            "private_key",
            "private_key",
            "did.did = private_key.didId"
          )
          .select(["did.*", "private_key.keyPathIndex"])
          .where("did.alias = :alias", {alias})
          .getRawMany();
      if (!didResponse) {
        return [];
      }
      return didResponse.map(
        (item) =>
          ({
            did: DID.fromString(item.did),
            alias: item.alias,
            keyPathIndex: item.private_key_keyPathIndex,
          } as PrismDIDInfo)
      );
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async getPrismDIDKeyPathIndex(did: DID) {
    const repository = this.dataSource.manager.getRepository("private_key");
    try {
      const data = await repository.findOne({
        where: {
          didId: did.toString(),
        },
        select: {
          keyPathIndex: true,
        },
      });
      return data?.keyPathIndex ?? null;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async getPrismLastKeyPathIndex() {
    const repository = this.dataSource.manager.getRepository("private_key");
    try {
      const data = await repository
        .createQueryBuilder("private_key")
        .select("private_key.keyPathIndex")
        .where((qb) => {
          const subQuery = qb
            .subQuery()
            .select("did.did")
            .from(Did, "did")
            .where("did.method = :method", {method: "prism"})
            .getQuery();
          return `private_key.didId IN ${subQuery}`;
        })
        .orderBy("private_key.keyPathIndex", "DESC")
        .limit(1)
        .getOne();
      return data?.keyPathIndex ?? 0;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async getAllPeerDIDs() {
    const didRepository: Repository<entities.Did> =
      this.dataSource.manager.getRepository("did");
    const privateKeysRepository =
      this.dataSource.manager.getRepository("private_key");
    /*
     * This method is overcomplicated, dids should have relations.
     * */
    try {
      const dids = await didRepository.find({
        where: {
          method: "peer",
        },
      });

      const didsWithKeys = await Promise.all(
        dids.map(async (item) => {
          return {
            ...item,
            privateKeys: await privateKeysRepository.find({
              where: {
                didId: item.did,
              },
            }),
          };
        })
      );

      return didsWithKeys.map((item) => ({
        did: DID.fromString(item.did),
        privateKeys: item.privateKeys.map((key) => ({
          keyCurve: getKeyCurveByNameAndIndex(key.curve, key.keyPathIndex),
          value: Buffer.from(key.privateKey),
        })),
      })) as PeerDID[];
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async getDIDPrivateKeysByDID(did: DID) {
    const repository = this.dataSource.manager.getRepository("private_key");
    try {
      const didString = did.toString();
      const data = await repository.findBy({
        didId: Like(`${didString}%`),
      });
      return data.map((item) => ({
        keyCurve: getKeyCurveByNameAndIndex(item.curve),
        value: Buffer.from(item.privateKey),
      })) as PrivateKey[];
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async getDIDPrivateKeyByID(id: string) {
    const repository = this.dataSource.manager.getRepository("private_key");

    try {
      const data = await repository.findOne({
        where: {
          id,
        },
      });
      if (!data) {
        return null;
      }
      return {
        keyCurve: getKeyCurveByNameAndIndex(data.curve),
        value: Buffer.from(data.privateKey),
      } as PrivateKey;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async getAllDidPairs() {
    const repository = this.dataSource.manager.getRepository("did_pair");
    try {
      const data = await repository.find({
        relationLoadStrategy: "join",
      });
      return data.map((didPair) => ({
        host: DID.fromString(didPair.hostDID),
        name: didPair.name,
        receiver: DID.fromString(didPair.receiverDID),
      })) as DIDPair[];
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async getPairByDID(did: DID) {
    const repository = this.dataSource.manager.getRepository("did_pair");
    try {
      const data = await repository.findOne({
        where: {
          hostDID: did.toString(),
        },
        relationLoadStrategy: "join",
      });
      if (!data) {
        return null;
      }
      return {
        host: DID.fromString(data.hostDID),
        name: data.name,
        receiver: DID.fromString(data.receiverDID),
      } as DIDPair;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async getPairByName(name: string) {
    const repository = this.dataSource.manager.getRepository("did_pair");
    try {
      const data = await repository.findOne({
        where: {
          name: name,
        },
        relationLoadStrategy: "join",
      });
      if (!data) {
        return null;
      }
      return {
        host: DID.fromString(data.hostDID),
        name: data.name,
        receiver: DID.fromString(data.receiverDID),
      } as DIDPair;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async getAllMessages() {
    const repository: Repository<entities.Message> =
      this.dataSource.manager.getRepository("message");
    const data = await repository.find();

    return data.map(Pluto.transformMessageDBToInterface);
  }

  async getAllMessagesByDID(did: DID) {
    const repository: Repository<entities.Message> =
      this.dataSource.manager.getRepository("message");
    const data = await repository.find({
      where: {
        from: did.toString(),
      },
    });

    return data.map(Pluto.transformMessageDBToInterface);
  }

  async getAllMessagesSent() {
    const repository: Repository<entities.Message> =
      this.dataSource.manager.getRepository("message");
    const data = await repository.find({
      where: {
        isReceived: 0,
      },
    });
    return data.map(Pluto.transformMessageDBToInterface);
  }

  async getAllMessagesReceived() {
    const repository: Repository<entities.Message> =
      this.dataSource.manager.getRepository("message");
    const data = await repository.find({
      where: {
        isReceived: 1,
      },
    });
    return data.map(Pluto.transformMessageDBToInterface);
  }

  async getAllMessagesSentTo(did: DID) {
    const repository: Repository<entities.Message> =
      this.dataSource.manager.getRepository("message");
    const data = await repository.find({
      where: {
        to: did.toString(),
      },
    });
    return data.map(Pluto.transformMessageDBToInterface);
  }

  async getAllMessagesReceivedFrom(did: DID) {
    const repository: Repository<entities.Message> =
      this.dataSource.manager.getRepository("message");
    const data = await repository.find({
      where: {
        from: did.toString(),
      },
    });
    return data.map(Pluto.transformMessageDBToInterface);
  }

  async getAllMessagesOfType(type: string, relatedWithDID?: DID) {
    const repository: Repository<entities.Message> =
      this.dataSource.manager.getRepository("message");
    const data = await repository
      .createQueryBuilder("message")
      .where("message.type = :type", {type})
      .andWhere(
        ":relatedWithDID IS NULL OR :relatedWithDID IN (message.from, message.to)",
        {relatedWithDID: relatedWithDID?.toString() ?? null}
      )
      .getMany();

    return data.map(Pluto.transformMessageDBToInterface);
  }

  async getAllMessagesByFromToDID(from: DID, to: DID) {
    const repository: Repository<entities.Message> =
      this.dataSource.manager.getRepository("message");
    const data = await repository.find({
      where: {
        from: from.toString(),
        to: to.toString(),
      },
    });
    return data.map(Pluto.transformMessageDBToInterface);
  }

  async getMessage(id: string) {
    const repository: Repository<entities.Message> =
      this.dataSource.manager.getRepository("message");
    const data = await repository.findOne({
      where: {
        id,
      },
    });
    if (!data) {
      return null;
    }
    return Pluto.transformMessageDBToInterface(data);
  }

  async getAllMediators() {
    const repository: Repository<entities.Mediator> =
      this.dataSource.manager.getRepository("mediator");
    const data = await repository.find({
      relationLoadStrategy: "join",
    });
    return data.map((item) => ({
      id: item.id,
      mediatorDID: DID.fromString(item.mediatorDidId),
      hostDID: DID.fromString(item.hostDidId),
      routingDID: DID.fromString(item.routingDidId),
    })) as Mediator[];
  }

  async getAllCredentials() {
    const repository: Repository<entities.VerifiableCredential> =
      this.dataSource.manager.getRepository("verifiable_credential");
    const data = await repository.find();
    return data.map((credential) => {
      const json = JSON.parse(credential.verifiableCredentialJson);
      return {
        ...json,
        id: credential.id,
        issuer: DID.fromString(credential.issuerDIDId),
        subject: DID.fromString(json.subject),
      };
    }) as VerifiableCredential[];
  }

  async storeCredential(credential: VerifiableCredential) {
    const verifiableCredentialEntity = new entities.VerifiableCredential();
    verifiableCredentialEntity.credentialType = credential.credentialType;
    verifiableCredentialEntity.expirationDate = credential.expirationDate;
    verifiableCredentialEntity.issuanceDate = credential.issuanceDate;
    verifiableCredentialEntity.verifiableCredentialJson = JSON.stringify({
      ...credential,
      subject: credential.subject?.toString(),
    });
    verifiableCredentialEntity.issuerDIDId = credential.issuer.toString();

    await this.dataSource.manager.save(verifiableCredentialEntity);
  }
}
