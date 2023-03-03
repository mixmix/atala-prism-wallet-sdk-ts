"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiCodec = exports.KeyType = exports.Codec = void 0;
const VarInt_1 = require("./VarInt");
var Codec;
(function (Codec) {
    Codec[Codec["x25519"] = 236] = "x25519";
    Codec[Codec["ed25519"] = 237] = "ed25519";
})(Codec = exports.Codec || (exports.Codec = {}));
var KeyType;
(function (KeyType) {
    KeyType[KeyType["agreement"] = 0] = "agreement";
    KeyType[KeyType["authenticate"] = 1] = "authenticate";
})(KeyType = exports.KeyType || (exports.KeyType = {}));
class MultiCodec {
    value;
    static KeyType = KeyType;
    constructor(value, keyType) {
        this.value = value;
        if (typeof keyType !== "undefined") {
            const codec = keyType === KeyType.agreement ? Codec.x25519 : Codec.ed25519;
            const buffer = (0, VarInt_1.putUVarInt)(codec, Array.from(this.value));
            this.value = Uint8Array.from(buffer);
        }
        else {
            this.value = value;
        }
    }
    decode(defaultCodec) {
        const [code, bytes] = (0, VarInt_1.uVarInt)(Array.from(this.value));
        const bufferWithoutBytes = !defaultCodec
            ? this.value
            : this.value.slice(bytes);
        return [defaultCodec || code, bufferWithoutBytes];
    }
}
exports.MultiCodec = MultiCodec;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTXVsdGljb2RlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9wZWVyLWRpZC9oZWxwZXJzL011bHRpY29kZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscUNBQStDO0FBRS9DLElBQVksS0FHWDtBQUhELFdBQVksS0FBSztJQUNmLHVDQUFhLENBQUE7SUFDYix5Q0FBYyxDQUFBO0FBQ2hCLENBQUMsRUFIVyxLQUFLLEdBQUwsYUFBSyxLQUFMLGFBQUssUUFHaEI7QUFFRCxJQUFZLE9BR1g7QUFIRCxXQUFZLE9BQU87SUFDakIsK0NBQVMsQ0FBQTtJQUNULHFEQUFZLENBQUE7QUFDZCxDQUFDLEVBSFcsT0FBTyxHQUFQLGVBQU8sS0FBUCxlQUFPLFFBR2xCO0FBRUQsTUFBYSxVQUFVO0lBR0Y7SUFGbkIsTUFBTSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFFekIsWUFBbUIsS0FBaUIsRUFBRSxPQUFpQjtRQUFwQyxVQUFLLEdBQUwsS0FBSyxDQUFZO1FBQ2xDLElBQUksT0FBTyxPQUFPLEtBQUssV0FBVyxFQUFFO1lBQ2xDLE1BQU0sS0FBSyxHQUNULE9BQU8sS0FBSyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO1lBRS9ELE1BQU0sTUFBTSxHQUFHLElBQUEsbUJBQVUsRUFBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUV6RCxJQUFJLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDdEM7YUFBTTtZQUNMLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1NBQ3BCO0lBQ0gsQ0FBQztJQUVELE1BQU0sQ0FBQyxZQUFvQjtRQUN6QixNQUFNLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxHQUFHLElBQUEsZ0JBQU8sRUFBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ3RELE1BQU0sa0JBQWtCLEdBQUcsQ0FBQyxZQUFZO1lBQ3RDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSztZQUNaLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM1QixPQUFPLENBQUMsWUFBWSxJQUFJLElBQUksRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO0lBQ3BELENBQUM7O0FBdEJILGdDQXVCQyJ9