"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = exports.MessageDirection = void 0;
const uuid_1 = require("uuid");
var MessageDirection;
(function (MessageDirection) {
    MessageDirection[MessageDirection["SENT"] = 0] = "SENT";
    MessageDirection[MessageDirection["RECEIVED"] = 1] = "RECEIVED";
})(MessageDirection = exports.MessageDirection || (exports.MessageDirection = {}));
class Message {
    piuri;
    id;
    direction;
    ack;
    body;
    extraHeaders;
    createdTime;
    expiresTimePlus;
    attachments;
    from;
    to;
    fromPrior;
    thid;
    pthid;
    constructor(piuri, id = (0, uuid_1.v4)(), direction = MessageDirection.RECEIVED, ack = [], body, extraHeaders = [], createdTime = Date.now().toString(), expiresTimePlus = (Date.now() + 1 * 24 * 60 * 60 * 1000).toString(), attachments = [], from, to, fromPrior, thid, pthid) {
        this.piuri = piuri;
        this.id = id;
        this.direction = direction;
        this.ack = ack;
        this.body = body;
        this.extraHeaders = extraHeaders;
        this.createdTime = createdTime;
        this.expiresTimePlus = expiresTimePlus;
        this.attachments = attachments;
        this.from = from;
        this.to = to;
        this.fromPrior = fromPrior;
        this.thid = thid;
        this.pthid = pthid;
    }
}
exports.Message = Message;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVzc2FnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kb21haW4vbW9kZWxzL01lc3NhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsK0JBQW9DO0FBS3BDLElBQVksZ0JBR1Q7QUFISCxXQUFZLGdCQUFnQjtJQUMxQix1REFBUSxDQUFBO0lBQ1IsK0RBQVksQ0FBQTtBQUNaLENBQUMsRUFIUyxnQkFBZ0IsR0FBaEIsd0JBQWdCLEtBQWhCLHdCQUFnQixRQUd6QjtBQUdELE1BQWEsT0FBTztJQUVBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFkbEIsWUFDa0IsS0FBYSxFQUNiLEtBQWEsSUFBQSxTQUFNLEdBQUUsRUFDckIsWUFBOEIsZ0JBQWdCLENBQUMsUUFBUSxFQUN2RCxNQUFnQixFQUFFLEVBQ2xCLElBQVksRUFDWixlQUF5QixFQUFFLEVBQzNCLGNBQXNCLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLEVBQUUsRUFDM0Msa0JBQTBCLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFDM0UsY0FBc0MsRUFBRSxFQUN4QyxJQUFVLEVBQ1YsRUFBUSxFQUNSLFNBQWtCLEVBQ2xCLElBQWEsRUFDYixLQUFjO1FBYmQsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQUNiLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBQ3JCLGNBQVMsR0FBVCxTQUFTLENBQThDO1FBQ3ZELFFBQUcsR0FBSCxHQUFHLENBQWU7UUFDbEIsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUNaLGlCQUFZLEdBQVosWUFBWSxDQUFlO1FBQzNCLGdCQUFXLEdBQVgsV0FBVyxDQUFnQztRQUMzQyxvQkFBZSxHQUFmLGVBQWUsQ0FBNEQ7UUFDM0UsZ0JBQVcsR0FBWCxXQUFXLENBQTZCO1FBQ3hDLFNBQUksR0FBSixJQUFJLENBQU07UUFDVixPQUFFLEdBQUYsRUFBRSxDQUFNO1FBQ1IsY0FBUyxHQUFULFNBQVMsQ0FBUztRQUNsQixTQUFJLEdBQUosSUFBSSxDQUFTO1FBQ2IsVUFBSyxHQUFMLEtBQUssQ0FBUztJQUM3QixDQUFDO0NBQ0w7QUFqQkQsMEJBaUJDIn0=