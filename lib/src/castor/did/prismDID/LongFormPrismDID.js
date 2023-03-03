"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LongFormPrismDID = void 0;
const Errors_1 = require("../../../domain/models/Errors");
const PrismDIDMethodId_1 = require("./PrismDIDMethodId");
class LongFormPrismDID {
    did;
    prismMethodId;
    stateHash;
    encodedState;
    constructor(did) {
        this.did = did;
        const methodId = new PrismDIDMethodId_1.PrismDIDMethodId(did.methodId);
        if (methodId.sections.length !== 2) {
            throw new Errors_1.CastorError.InvalidLongFormDID();
        }
        const stateHash = methodId.sections[0];
        const encodedState = methodId.sections[1];
        this.prismMethodId = methodId;
        this.stateHash = stateHash;
        this.encodedState = encodedState;
    }
}
exports.LongFormPrismDID = LongFormPrismDID;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9uZ0Zvcm1QcmlzbURJRC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jYXN0b3IvZGlkL3ByaXNtRElEL0xvbmdGb3JtUHJpc21ESUQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsMERBQTREO0FBQzVELHlEQUFzRDtBQUV0RCxNQUFhLGdCQUFnQjtJQUtDO0lBSnBCLGFBQWEsQ0FBbUI7SUFDeEIsU0FBUyxDQUFTO0lBQ2xCLFlBQVksQ0FBUztJQUVyQyxZQUE0QixHQUFRO1FBQVIsUUFBRyxHQUFILEdBQUcsQ0FBSztRQUNsQyxNQUFNLFFBQVEsR0FBRyxJQUFJLG1DQUFnQixDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUVwRCxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUNsQyxNQUFNLElBQUksb0JBQVcsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1NBQzVDO1FBRUQsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2QyxNQUFNLFlBQVksR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTFDLElBQUksQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDO1FBQzlCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzNCLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO0lBQ25DLENBQUM7Q0FDRjtBQW5CRCw0Q0FtQkMifQ==