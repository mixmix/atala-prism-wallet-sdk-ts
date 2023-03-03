"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidPeerDIDError = exports.InvalidKeyError = exports.InvalidJWKKeysError = exports.NotPossibleToResolveDID = exports.InitialStateOfDIDChanged = exports.InvalidDIDString = exports.InvalidPublicKeyEncoding = exports.MethodIdIsDoesNotSatisfyRegex = exports.InvalidLongFormDID = void 0;
class InvalidLongFormDID extends Error {
    constructor(message) {
        super(message);
    }
}
exports.InvalidLongFormDID = InvalidLongFormDID;
class MethodIdIsDoesNotSatisfyRegex extends Error {
    constructor(message) {
        super(message);
    }
}
exports.MethodIdIsDoesNotSatisfyRegex = MethodIdIsDoesNotSatisfyRegex;
class InvalidPublicKeyEncoding extends Error {
    constructor(message) {
        super(message);
    }
}
exports.InvalidPublicKeyEncoding = InvalidPublicKeyEncoding;
class InvalidDIDString extends Error {
    constructor(message) {
        super(message);
    }
}
exports.InvalidDIDString = InvalidDIDString;
class InitialStateOfDIDChanged extends Error {
    constructor(message) {
        super(message);
    }
}
exports.InitialStateOfDIDChanged = InitialStateOfDIDChanged;
class NotPossibleToResolveDID extends Error {
    constructor(message) {
        super(message);
    }
}
exports.NotPossibleToResolveDID = NotPossibleToResolveDID;
class InvalidJWKKeysError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.InvalidJWKKeysError = InvalidJWKKeysError;
class InvalidKeyError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.InvalidKeyError = InvalidKeyError;
class InvalidPeerDIDError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.InvalidPeerDIDError = InvalidPeerDIDError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FzdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2RvbWFpbi9tb2RlbHMvZXJyb3JzL0Nhc3Rvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSxNQUFhLGtCQUFtQixTQUFRLEtBQUs7SUFDM0MsWUFBWSxPQUFnQjtRQUMxQixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDakIsQ0FBQztDQUNGO0FBSkQsZ0RBSUM7QUFFRCxNQUFhLDZCQUE4QixTQUFRLEtBQUs7SUFDdEQsWUFBWSxPQUFnQjtRQUMxQixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDakIsQ0FBQztDQUNGO0FBSkQsc0VBSUM7QUFFRCxNQUFhLHdCQUF5QixTQUFRLEtBQUs7SUFDakQsWUFBWSxPQUFnQjtRQUMxQixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDakIsQ0FBQztDQUNGO0FBSkQsNERBSUM7QUFFRCxNQUFhLGdCQUFpQixTQUFRLEtBQUs7SUFDekMsWUFBWSxPQUFnQjtRQUMxQixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDakIsQ0FBQztDQUNGO0FBSkQsNENBSUM7QUFFRCxNQUFhLHdCQUF5QixTQUFRLEtBQUs7SUFDakQsWUFBWSxPQUFnQjtRQUMxQixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDakIsQ0FBQztDQUNGO0FBSkQsNERBSUM7QUFFRCxNQUFhLHVCQUF3QixTQUFRLEtBQUs7SUFDaEQsWUFBWSxPQUFnQjtRQUMxQixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDakIsQ0FBQztDQUNGO0FBSkQsMERBSUM7QUFFRCxNQUFhLG1CQUFvQixTQUFRLEtBQUs7SUFDNUMsWUFBWSxPQUFnQjtRQUMxQixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDakIsQ0FBQztDQUNGO0FBSkQsa0RBSUM7QUFFRCxNQUFhLGVBQWdCLFNBQVEsS0FBSztJQUN4QyxZQUFZLE9BQWdCO1FBQzFCLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNqQixDQUFDO0NBQ0Y7QUFKRCwwQ0FJQztBQUVELE1BQWEsbUJBQW9CLFNBQVEsS0FBSztJQUM1QyxZQUFZLE9BQWdCO1FBQzFCLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNqQixDQUFDO0NBQ0Y7QUFKRCxrREFJQyJ9