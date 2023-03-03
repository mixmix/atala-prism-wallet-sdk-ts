"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidKeyCurve = exports.CouldNotParseMessageString = exports.InvalidMnemonicWord = void 0;
class InvalidMnemonicWord extends Error {
    constructor(message) {
        super(message);
    }
}
exports.InvalidMnemonicWord = InvalidMnemonicWord;
class CouldNotParseMessageString extends Error {
    constructor(message) {
        super(message);
    }
}
exports.CouldNotParseMessageString = CouldNotParseMessageString;
class InvalidKeyCurve extends Error {
    constructor(message) {
        super(message);
    }
}
exports.InvalidKeyCurve = InvalidKeyCurve;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBvbGxvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2RvbWFpbi9tb2RlbHMvZXJyb3JzL0Fwb2xsby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSxNQUFhLG1CQUFvQixTQUFRLEtBQUs7SUFDNUMsWUFBWSxPQUFnQjtRQUMxQixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDakIsQ0FBQztDQUNGO0FBSkQsa0RBSUM7QUFFRCxNQUFhLDBCQUEyQixTQUFRLEtBQUs7SUFDbkQsWUFBWSxPQUFnQjtRQUMxQixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDakIsQ0FBQztDQUNGO0FBSkQsZ0VBSUM7QUFFRCxNQUFhLGVBQWdCLFNBQVEsS0FBSztJQUN4QyxZQUFZLE9BQWdCO1FBQzFCLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNqQixDQUFDO0NBQ0Y7QUFKRCwwQ0FJQyJ9