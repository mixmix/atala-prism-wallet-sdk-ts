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
const DIDParser = __importStar(require("../../src/castor/parser/DIDParser"));
describe("DIDParser", () => {
    it("should test valid DIDs", () => {
        const didExample1 = "did:aaaaaa:aa:aaa";
        const didExample2 = "did:prism01:b2.-_%11:b4._-%11";
        const didExample3 = "did:prism:b6c0c33d701ac1b9a262a14454d1bbde3d127d697a76950963c5fd930605:Cj8KPRI7CgdtYXN0ZXIwEAFKLgoJc2VmsxEiECSTjyV7sUfCr_ArpN9rvCwR9fRMAhcsr_S7ZRiJk4p5k";
        const parsedDID1 = DIDParser.parse(didExample1);
        const parsedDID2 = DIDParser.parse(didExample2);
        const parsedDID3 = DIDParser.parse(didExample3);
        (0, chai_1.expect)(parsedDID1.schema).to.equal("did");
        (0, chai_1.expect)(parsedDID1.method).to.equal("aaaaaa");
        (0, chai_1.expect)(parsedDID1.methodId).to.equal("aa:aaa");
        (0, chai_1.expect)(parsedDID2.schema).to.equal("did");
        (0, chai_1.expect)(parsedDID2.method).to.equal("prism01");
        (0, chai_1.expect)(parsedDID2.methodId).to.equal("b2.-_%11:b4._-%11");
        (0, chai_1.expect)(parsedDID3.schema).to.equal("did");
        (0, chai_1.expect)(parsedDID3.method).to.equal("prism");
        (0, chai_1.expect)(parsedDID3.methodId).to.equal("b6c0c33d701ac1b9a262a14454d1bbde3d127d697a76950963c5fd930605:Cj8KPRI7CgdtYXN0ZXIwEAFKLgoJc2VmsxEiECSTjyV7sUfCr_ArpN9rvCwR9fRMAhcsr_S7ZRiJk4p5k");
    });
    it("should test invalid DIDs", () => {
        const didExample1 = "idi:aaaaaa:aa:aaa";
        const didExample2 = "did:-prism-:aaaaa:aaaa";
        const didExample3 = "did:prism:aaaaaaaaaaa::";
        const didExample4 = "did::prism:aaaaaaaaaaa:aaaa";
        const didExample5 = "did:prism::aaaaaaaaaaa:bbbb";
        chai_1.assert.throws(() => {
            DIDParser.parse(didExample1);
        }, Error, 'Invalid Did char found at [line 1, col 0] "i"');
        chai_1.assert.throws(() => {
            DIDParser.parse(didExample2);
        }, Error, 'Invalid Did char found at [line 1, col 4] "-"');
        chai_1.assert.throws(() => {
            DIDParser.parse(didExample3);
        }, Error, 'Invalid Did char found at [line 1, col 22] ":"');
        chai_1.assert.throws(() => {
            DIDParser.parse(didExample4);
        }, Error, 'Invalid Did char found at [line 1, col 22] ":"');
        chai_1.assert.throws(() => {
            DIDParser.parse(didExample5);
        }, Error, 'Invalid Did char found at [line 1, col 22] ":"');
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRElEUGFyc2VyLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi90ZXN0cy9jYXN0b3IvRElEUGFyc2VyLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtCQUFzQztBQUN0Qyw2RUFBK0Q7QUFFL0QsUUFBUSxDQUFDLFdBQVcsRUFBRSxHQUFHLEVBQUU7SUFDekIsRUFBRSxDQUFDLHdCQUF3QixFQUFFLEdBQUcsRUFBRTtRQUNoQyxNQUFNLFdBQVcsR0FBRyxtQkFBbUIsQ0FBQztRQUN4QyxNQUFNLFdBQVcsR0FBRywrQkFBK0IsQ0FBQztRQUNwRCxNQUFNLFdBQVcsR0FDZiwwSkFBMEosQ0FBQztRQUU3SixNQUFNLFVBQVUsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2hELE1BQU0sVUFBVSxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDaEQsTUFBTSxVQUFVLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUVoRCxJQUFBLGFBQU0sRUFBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMxQyxJQUFBLGFBQU0sRUFBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM3QyxJQUFBLGFBQU0sRUFBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUUvQyxJQUFBLGFBQU0sRUFBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMxQyxJQUFBLGFBQU0sRUFBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM5QyxJQUFBLGFBQU0sRUFBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBRTFELElBQUEsYUFBTSxFQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzFDLElBQUEsYUFBTSxFQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzVDLElBQUEsYUFBTSxFQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUNsQyxnSkFBZ0osQ0FDakosQ0FBQztJQUNKLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLDBCQUEwQixFQUFFLEdBQUcsRUFBRTtRQUNsQyxNQUFNLFdBQVcsR0FBRyxtQkFBbUIsQ0FBQztRQUN4QyxNQUFNLFdBQVcsR0FBRyx3QkFBd0IsQ0FBQztRQUM3QyxNQUFNLFdBQVcsR0FBRyx5QkFBeUIsQ0FBQztRQUM5QyxNQUFNLFdBQVcsR0FBRyw2QkFBNkIsQ0FBQztRQUNsRCxNQUFNLFdBQVcsR0FBRyw2QkFBNkIsQ0FBQztRQUVsRCxhQUFNLENBQUMsTUFBTSxDQUNYLEdBQUcsRUFBRTtZQUNILFNBQVMsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDL0IsQ0FBQyxFQUNELEtBQUssRUFDTCwrQ0FBK0MsQ0FDaEQsQ0FBQztRQUNGLGFBQU0sQ0FBQyxNQUFNLENBQ1gsR0FBRyxFQUFFO1lBQ0gsU0FBUyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUMvQixDQUFDLEVBQ0QsS0FBSyxFQUNMLCtDQUErQyxDQUNoRCxDQUFDO1FBQ0YsYUFBTSxDQUFDLE1BQU0sQ0FDWCxHQUFHLEVBQUU7WUFDSCxTQUFTLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQy9CLENBQUMsRUFDRCxLQUFLLEVBQ0wsZ0RBQWdELENBQ2pELENBQUM7UUFDRixhQUFNLENBQUMsTUFBTSxDQUNYLEdBQUcsRUFBRTtZQUNILFNBQVMsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDL0IsQ0FBQyxFQUNELEtBQUssRUFDTCxnREFBZ0QsQ0FDakQsQ0FBQztRQUNGLGFBQU0sQ0FBQyxNQUFNLENBQ1gsR0FBRyxFQUFFO1lBQ0gsU0FBUyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUMvQixDQUFDLEVBQ0QsS0FBSyxFQUNMLGdEQUFnRCxDQUNqRCxDQUFDO0lBQ0osQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9