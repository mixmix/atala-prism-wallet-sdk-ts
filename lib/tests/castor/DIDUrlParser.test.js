"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const DIDUrlParser = __importStar(require("../../src/castor/parser/DIDUrlParser"));
describe("DIDUrlParser", () => {
    it("should test valid URLs", () => {
        const didExample1 = "did:example:123456:adsd/path?query=something#fragment";
        const didExample2 = "did:example:123456/path?query=something&query2=something#0";
        const didExample3 = "did:example:123456/path/jpg.pp?query=something";
        const parsedDID1 = DIDUrlParser.parse(didExample1);
        const parsedDID2 = DIDUrlParser.parse(didExample2);
        const parsedDID3 = DIDUrlParser.parse(didExample3);
        const expectedMap = new Map([["query", "something"]]);
        const secondaryExpectedMap = new Map([
            ["query", "something"],
            ["query2", "something"],
        ]);
        (0, chai_1.expect)(parsedDID1.did.schema).to.equal("did");
        (0, chai_1.expect)(parsedDID1.did.method).to.equal("example");
        (0, chai_1.expect)(parsedDID1.did.methodId).to.equal("123456:adsd");
        (0, chai_1.expect)(parsedDID1.path).to.deep.equal(["path"]);
        (0, chai_1.expect)(parsedDID1.parameters.keys()).to.deep.equal(expectedMap.keys());
        (0, chai_1.expect)(parsedDID1.parameters.entries()).to.deep.equal(expectedMap.entries());
        (0, chai_1.expect)(parsedDID1.fragment).to.equal("fragment");
        (0, chai_1.expect)(parsedDID2.did.schema).to.equal("did");
        (0, chai_1.expect)(parsedDID2.did.method).to.equal("example");
        (0, chai_1.expect)(parsedDID2.did.methodId).to.equal("123456");
        (0, chai_1.expect)(parsedDID2.path).to.deep.equal(["path"]);
        (0, chai_1.expect)(parsedDID2.parameters.keys()).to.deep.equal(secondaryExpectedMap.keys());
        (0, chai_1.expect)(parsedDID2.parameters.entries()).to.deep.equal(secondaryExpectedMap.entries());
        (0, chai_1.expect)(parsedDID2.fragment).to.equal("0");
        (0, chai_1.expect)(parsedDID3.did.schema).to.equal("did");
        (0, chai_1.expect)(parsedDID3.did.method).to.equal("example");
        (0, chai_1.expect)(parsedDID3.did.methodId).to.equal("123456");
        (0, chai_1.expect)(parsedDID3.path).to.deep.equal(["path", "jpg.pp"]);
        (0, chai_1.expect)(parsedDID3.parameters.keys()).to.deep.equal(expectedMap.keys());
        (0, chai_1.expect)(parsedDID3.parameters.entries()).to.deep.equal(expectedMap.entries());
        (0, chai_1.expect)(parsedDID3.fragment).to.equal("");
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRElEVXJsUGFyc2VyLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi90ZXN0cy9jYXN0b3IvRElEVXJsUGFyc2VyLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtCQUE4QjtBQUU5QixtRkFBcUU7QUFFckUsUUFBUSxDQUFDLGNBQWMsRUFBRSxHQUFHLEVBQUU7SUFDNUIsRUFBRSxDQUFDLHdCQUF3QixFQUFFLEdBQUcsRUFBRTtRQUNoQyxNQUFNLFdBQVcsR0FBRyx1REFBdUQsQ0FBQztRQUM1RSxNQUFNLFdBQVcsR0FDZiw0REFBNEQsQ0FBQztRQUMvRCxNQUFNLFdBQVcsR0FBRyxnREFBZ0QsQ0FBQztRQUVyRSxNQUFNLFVBQVUsR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ25ELE1BQU0sVUFBVSxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDbkQsTUFBTSxVQUFVLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNuRCxNQUFNLFdBQVcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0RCxNQUFNLG9CQUFvQixHQUFHLElBQUksR0FBRyxDQUFDO1lBQ25DLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQztZQUN0QixDQUFDLFFBQVEsRUFBRSxXQUFXLENBQUM7U0FDeEIsQ0FBQyxDQUFDO1FBRUgsSUFBQSxhQUFNLEVBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzlDLElBQUEsYUFBTSxFQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxTQUFTLENB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