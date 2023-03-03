"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismDIDMethodId = void 0;
const Errors_1 = require("../../../domain/models/Errors");
class PrismDIDMethodId {
    value;
    sections;
    constructor(value) {
        const sectionRegex = /^[A-Za-z0-9_-]+$/;
        const methodSpecificIdRegex = /^([A-Za-z0-9_-]*:)*[A-Za-z0-9_-]+$/;
        this.value = value;
        this.sections = value.split(":");
        if (!this.sections.every((section) => sectionRegex.test(section))) {
            throw new Errors_1.CastorError.MethodIdIsDoesNotSatisfyRegex();
        }
        if (!methodSpecificIdRegex.test(value)) {
            throw new Errors_1.CastorError.MethodIdIsDoesNotSatisfyRegex();
        }
    }
    static fromSections(sections) {
        return new PrismDIDMethodId(sections.join(":"));
    }
    toString() {
        return this.value;
    }
}
exports.PrismDIDMethodId = PrismDIDMethodId;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJpc21ESURNZXRob2RJZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jYXN0b3IvZGlkL3ByaXNtRElEL1ByaXNtRElETWV0aG9kSWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMERBQTREO0FBRTVELE1BQWEsZ0JBQWdCO0lBQ1YsS0FBSyxDQUFTO0lBQ3RCLFFBQVEsQ0FBVztJQUU1QixZQUFZLEtBQWE7UUFDdkIsTUFBTSxZQUFZLEdBQUcsa0JBQWtCLENBQUM7UUFDeEMsTUFBTSxxQkFBcUIsR0FBRyxvQ0FBb0MsQ0FBQztRQUVuRSxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFakMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUU7WUFDakUsTUFBTSxJQUFJLG9CQUFXLENBQUMsNkJBQTZCLEVBQUUsQ0FBQztTQUN2RDtRQUNELElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDdEMsTUFBTSxJQUFJLG9CQUFXLENBQUMsNkJBQTZCLEVBQUUsQ0FBQztTQUN2RDtJQUNILENBQUM7SUFFRCxNQUFNLENBQUMsWUFBWSxDQUFDLFFBQWtCO1FBQ3BDLE9BQU8sSUFBSSxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVELFFBQVE7UUFDTixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDcEIsQ0FBQztDQUNGO0FBMUJELDRDQTBCQyJ9