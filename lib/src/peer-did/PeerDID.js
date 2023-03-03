"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PeerDID = exports.PeerDIDService = void 0;
const Errors_1 = require("../domain/models/Errors");
class PeerDIDService {
    type;
    serviceEndpoint;
    routingKeys;
    accept;
    constructor(type, serviceEndpoint, routingKeys, accept) {
        this.type = type;
        this.serviceEndpoint = serviceEndpoint;
        this.routingKeys = routingKeys;
        this.accept = accept;
    }
    static DIDCommMessagingKey = "DIDCommMessaging";
    static DIDCommMessagingEncodedKey = "dm";
    static CodingKeys = {
        type: "t",
        serviceEndpoint: "s",
        routingKeys: "r",
        accept: "a",
    };
    encode() {
        return {
            r: this.routingKeys,
            s: this.serviceEndpoint,
            a: this.accept,
            t: this.type.replace(PeerDIDService.DIDCommMessagingKey, PeerDIDService.DIDCommMessagingEncodedKey),
        };
    }
    static decode(encoded) {
        return new PeerDIDService(encoded.t === PeerDIDService.DIDCommMessagingEncodedKey
            ? PeerDIDService.DIDCommMessagingKey
            : encoded.t, encoded.s, encoded.r, encoded.a);
    }
}
exports.PeerDIDService = PeerDIDService;
class PeerDID {
    did;
    constructor(did) {
        const regex = /(([01](z)([1-9a-km-zA-HJ-NP-Z]{46,47}))|(2((\.[AEVID](z)([1-9a-km-zA-HJ-NP-Z]{46,47}))+(\.(S)[0-9a-zA-Z=]*)?)))$/;
        if (!(did.schema === "did" &&
            did.method === "peer" &&
            regex.test(did.methodId))) {
            throw new Errors_1.CastorError.InvalidPeerDIDError();
        }
        this.did = did;
    }
}
exports.PeerDID = PeerDID;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGVlckRJRC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wZWVyLWRpZC9QZWVyRElELnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLG9EQUFzRDtBQVN0RCxNQUFhLGNBQWM7SUFDaEIsSUFBSSxDQUFTO0lBQ2IsZUFBZSxDQUFTO0lBQ3hCLFdBQVcsQ0FBVztJQUN0QixNQUFNLENBQVc7SUFFMUIsWUFDRSxJQUFZLEVBQ1osZUFBdUIsRUFDdkIsV0FBcUIsRUFDckIsTUFBZ0I7UUFFaEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLGVBQWUsR0FBRyxlQUFlLENBQUM7UUFDdkMsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDL0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDdkIsQ0FBQztJQUVELE1BQU0sQ0FBVSxtQkFBbUIsR0FBRyxrQkFBa0IsQ0FBQztJQUN6RCxNQUFNLENBQVUsMEJBQTBCLEdBQUcsSUFBSSxDQUFDO0lBRWxELE1BQU0sQ0FBVSxVQUFVLEdBQUc7UUFDM0IsSUFBSSxFQUFFLEdBQUc7UUFDVCxlQUFlLEVBQUUsR0FBRztRQUNwQixXQUFXLEVBQUUsR0FBRztRQUNoQixNQUFNLEVBQUUsR0FBRztLQUNaLENBQUM7SUFFRixNQUFNO1FBQ0osT0FBTztZQUNMLENBQUMsRUFBRSxJQUFJLENBQUMsV0FBVztZQUNuQixDQUFDLEVBQUUsSUFBSSxDQUFDLGVBQWU7WUFDdkIsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNO1lBQ2QsQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUNsQixjQUFjLENBQUMsbUJBQW1CLEVBQ2xDLGNBQWMsQ0FBQywwQkFBMEIsQ0FDMUM7U0FDRixDQUFDO0lBQ0osQ0FBQztJQUVELE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBdUI7UUFDbkMsT0FBTyxJQUFJLGNBQWMsQ0FDdkIsT0FBTyxDQUFDLENBQUMsS0FBSyxjQUFjLENBQUMsMEJBQTBCO1lBQ3JELENBQUMsQ0FBQyxjQUFjLENBQUMsbUJBQW1CO1lBQ3BDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUNiLE9BQU8sQ0FBQyxDQUFDLEVBQ1QsT0FBTyxDQUFDLENBQUMsRUFDVCxPQUFPLENBQUMsQ0FBQyxDQUNWLENBQUM7SUFDSixDQUFDOztBQWpESCx3Q0FrREM7QUFFRCxNQUFhLE9BQU87SUFDVCxHQUFHLENBQU07SUFFbEIsWUFBWSxHQUFRO1FBQ2xCLE1BQU0sS0FBSyxHQUNULGtIQUFrSCxDQUFDO1FBQ3JILElBQ0UsQ0FBQyxDQUNDLEdBQUcsQ0FBQyxNQUFNLEtBQUssS0FBSztZQUNwQixHQUFHLENBQUMsTUFBTSxLQUFLLE1BQU07WUFDckIsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQ3pCLEVBQ0Q7WUFDQSxNQUFNLElBQUksb0JBQVcsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1NBQzdDO1FBQ0QsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7SUFDakIsQ0FBQztDQUNGO0FBakJELDBCQWlCQyJ9