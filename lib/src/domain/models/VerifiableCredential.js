"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifiableCredentialTypeContainer = exports.CredentialType = void 0;
var CredentialType;
(function (CredentialType) {
    CredentialType["JWT"] = "jwt";
    CredentialType["W3C"] = "w3c";
    CredentialType["Unknown"] = "Unknown";
})(CredentialType = exports.CredentialType || (exports.CredentialType = {}));
class VerifiableCredentialTypeContainer {
    id;
    type;
    constructor(id, type) {
        this.id = id;
        this.type = type;
    }
}
exports.VerifiableCredentialTypeContainer = VerifiableCredentialTypeContainer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVmVyaWZpYWJsZUNyZWRlbnRpYWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZG9tYWluL21vZGVscy9WZXJpZmlhYmxlQ3JlZGVudGlhbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFJQSxJQUFZLGNBSVg7QUFKRCxXQUFZLGNBQWM7SUFDeEIsNkJBQVcsQ0FBQTtJQUNYLDZCQUFXLENBQUE7SUFDWCxxQ0FBbUIsQ0FBQTtBQUNyQixDQUFDLEVBSlcsY0FBYyxHQUFkLHNCQUFjLEtBQWQsc0JBQWMsUUFJekI7QUFHRCxNQUFhLGlDQUFpQztJQUUxQjtJQUNBO0lBRmxCLFlBQ2tCLEVBQVUsRUFDVixJQUFZO1FBRFosT0FBRSxHQUFGLEVBQUUsQ0FBUTtRQUNWLFNBQUksR0FBSixJQUFJLENBQVE7SUFDM0IsQ0FBQztDQUNMO0FBTEQsOEVBS0MifQ==