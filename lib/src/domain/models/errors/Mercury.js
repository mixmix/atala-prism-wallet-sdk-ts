"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlSessionError = exports.DidCommError = exports.CouldNotResolveDIDError = exports.UnknownPackingMessageError = exports.MessageInvalidBodyDataError = exports.MessageAttachmentWithoutIDError = exports.UnknownAttachmentDataError = exports.FromFieldNotSetError = exports.NoValidServiceFoundError = exports.NoDIDReceiverSetError = exports.InvalidURLError = void 0;
class InvalidURLError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.InvalidURLError = InvalidURLError;
class NoDIDReceiverSetError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.NoDIDReceiverSetError = NoDIDReceiverSetError;
class NoValidServiceFoundError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.NoValidServiceFoundError = NoValidServiceFoundError;
class FromFieldNotSetError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.FromFieldNotSetError = FromFieldNotSetError;
class UnknownAttachmentDataError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.UnknownAttachmentDataError = UnknownAttachmentDataError;
class MessageAttachmentWithoutIDError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.MessageAttachmentWithoutIDError = MessageAttachmentWithoutIDError;
class MessageInvalidBodyDataError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.MessageInvalidBodyDataError = MessageInvalidBodyDataError;
class UnknownPackingMessageError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.UnknownPackingMessageError = UnknownPackingMessageError;
class CouldNotResolveDIDError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.CouldNotResolveDIDError = CouldNotResolveDIDError;
class DidCommError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.DidCommError = DidCommError;
class UrlSessionError extends Error {
    statusCode;
    error;
    constructor(message, statusCode, error) {
        super(message);
        this.statusCode = statusCode || 500;
        this.error = error;
    }
}
exports.UrlSessionError = UrlSessionError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVyY3VyeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9kb21haW4vbW9kZWxzL2Vycm9ycy9NZXJjdXJ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLE1BQWEsZUFBZ0IsU0FBUSxLQUFLO0lBQ3hDLFlBQVksT0FBZ0I7UUFDMUIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2pCLENBQUM7Q0FDRjtBQUpELDBDQUlDO0FBRUQsTUFBYSxxQkFBc0IsU0FBUSxLQUFLO0lBQzlDLFlBQVksT0FBZ0I7UUFDMUIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2pCLENBQUM7Q0FDRjtBQUpELHNEQUlDO0FBRUQsTUFBYSx3QkFBeUIsU0FBUSxLQUFLO0lBQ2pELFlBQVksT0FBZ0I7UUFDMUIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2pCLENBQUM7Q0FDRjtBQUpELDREQUlDO0FBRUQsTUFBYSxvQkFBcUIsU0FBUSxLQUFLO0lBQzdDLFlBQVksT0FBZ0I7UUFDMUIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2pCLENBQUM7Q0FDRjtBQUpELG9EQUlDO0FBRUQsTUFBYSwwQkFBMkIsU0FBUSxLQUFLO0lBQ25ELFlBQVksT0FBZ0I7UUFDMUIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2pCLENBQUM7Q0FDRjtBQUpELGdFQUlDO0FBRUQsTUFBYSwrQkFBZ0MsU0FBUSxLQUFLO0lBQ3hELFlBQVksT0FBZ0I7UUFDMUIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2pCLENBQUM7Q0FDRjtBQUpELDBFQUlDO0FBRUQsTUFBYSwyQkFBNEIsU0FBUSxLQUFLO0lBQ3BELFlBQVksT0FBZ0I7UUFDMUIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2pCLENBQUM7Q0FDRjtBQUpELGtFQUlDO0FBRUQsTUFBYSwwQkFBMkIsU0FBUSxLQUFLO0lBQ25ELFlBQVksT0FBZ0I7UUFDMUIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2pCLENBQUM7Q0FDRjtBQUpELGdFQUlDO0FBRUQsTUFBYSx1QkFBd0IsU0FBUSxLQUFLO0lBQ2hELFlBQVksT0FBZ0I7UUFDMUIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2pCLENBQUM7Q0FDRjtBQUpELDBEQUlDO0FBRUQsTUFBYSxZQUFhLFNBQVEsS0FBSztJQUNyQyxZQUFZLE9BQWdCO1FBQzFCLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNqQixDQUFDO0NBQ0Y7QUFKRCxvQ0FJQztBQUVELE1BQWEsZUFBZ0IsU0FBUSxLQUFLO0lBQ3hDLFVBQVUsQ0FBUztJQUNuQixLQUFLLENBQVM7SUFFZCxZQUFZLE9BQWdCLEVBQUUsVUFBbUIsRUFBRSxLQUFhO1FBQzlELEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNmLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxJQUFJLEdBQUcsQ0FBQztRQUNwQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUNyQixDQUFDO0NBQ0Y7QUFURCwwQ0FTQyJ9