import * as SDK from "../index.js";
import {
  Apollo,
  Castor,
  Mercury,
  Pluto,
  DID,
  SeedWords
} from "domain/index.js";
interface TestScenario {
  apollo: Apollo;
  castor: Castor;
  pluto: Pluto;
  mercury: Mercury;
  seed: SeedWords;
  agent: SDK.Agent;
}


export function createTestScenario(
    mediatorDID: DID,
): TestScenario {
  const apollo = new SDK.Apollo();
  const api = new SDK.ApiImpl();
  const castor = new SDK.Castor(apollo);
  const pluto = new SDK.Pluto({
    type: "sqljs",
  });

  const didcomm = new SDK.DIDCommWrapper(apollo, castor, pluto);
  const mercury = new SDK.Mercury(castor, didcomm, api);
  const store = new SDK.PublicMediatorStore(pluto);
  const handler = new SDK.BasicMediatorHandler(mediatorDID, mercury, store);
  const manager = new SDK.ConnectionsManager(castor, mercury, pluto, handler);
  const seed = apollo.createRandomSeed();
  const agent = new SDK.Agent(
      apollo,
      castor,
      pluto,
      mercury,
      handler,
      manager,
      seed.seed
  );
  return {
    apollo,
    seed,
    agent,
    mercury,
    pluto,
    castor,
  };
}
