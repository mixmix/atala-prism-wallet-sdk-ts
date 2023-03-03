"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getKeyCurveByNameAndIndex = exports.Curve = void 0;
var Curve;
(function (Curve) {
    Curve["X25519"] = "X25519";
    Curve["ED25519"] = "Ed25519";
    Curve["SECP256K1"] = "Secp256k1";
})(Curve = exports.Curve || (exports.Curve = {}));
function getKeyCurveByNameAndIndex(name, index) {
    switch (name) {
        case Curve.X25519:
            return { curve: Curve.X25519 };
        case Curve.ED25519:
            return { curve: Curve.ED25519 };
        case Curve.SECP256K1:
        default:
            return { curve: Curve.SECP256K1, index };
    }
}
exports.getKeyCurveByNameAndIndex = getKeyCurveByNameAndIndex;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiS2V5Q3VydmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZG9tYWluL21vZGVscy9LZXlDdXJ2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFLQSxJQUFZLEtBSVg7QUFKRCxXQUFZLEtBQUs7SUFDZiwwQkFBaUIsQ0FBQTtJQUNqQiw0QkFBbUIsQ0FBQTtJQUNuQixnQ0FBdUIsQ0FBQTtBQUN6QixDQUFDLEVBSlcsS0FBSyxHQUFMLGFBQUssS0FBTCxhQUFLLFFBSWhCO0FBRUQsU0FBZ0IseUJBQXlCLENBQ3ZDLElBQVksRUFDWixLQUFjO0lBRWQsUUFBUSxJQUFJLEVBQUU7UUFDWixLQUFLLEtBQUssQ0FBQyxNQUFNO1lBQ2YsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDakMsS0FBSyxLQUFLLENBQUMsT0FBTztZQUNoQixPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNsQyxLQUFLLEtBQUssQ0FBQyxTQUFTLENBQUM7UUFDckI7WUFDRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLENBQUM7S0FDNUM7QUFDSCxDQUFDO0FBYkQsOERBYUMifQ==