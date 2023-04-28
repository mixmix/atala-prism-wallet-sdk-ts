import { DID } from "domain/index.js";

export class DIDTest extends DID {
  constructor(testMethod = "test", testMethodId = "testableId") {
    super("peer", testMethod, testMethodId);
  }

  static fromIndex(index: number): DID {
    const testMethod = `test${index}`;
    const testMethodId = `testableId${index}`;
    return new DID("schema", testMethod, testMethodId);
  }
}
