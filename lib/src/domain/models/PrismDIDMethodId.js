"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismDIDMethodId = void 0;
const Errors_1 = require("./Errors");
class PrismDIDMethodId {
    value;
    constructor(valueOrSections) {
        if (typeof valueOrSections === "string") {
            this.value = valueOrSections;
        }
        else {
            this.value = valueOrSections.join(":");
            const sectionRegex = /^[A-Za-z0-9_-]+$/;
            if (!valueOrSections.every((section) => sectionRegex.test(section))) {
                throw new Errors_1.CastorError.MethodIdIsDoesNotSatisfyRegex();
            }
            const methodSpecificIdRegex = /^([A-Za-z0-9_-]*:)*[A-Za-z0-9_-]+$/;
            if (!methodSpecificIdRegex.test(this.value)) {
                throw new Errors_1.CastorError.MethodIdIsDoesNotSatisfyRegex();
            }
        }
    }
    get sections() {
        return this.value.split(":");
    }
    toString() {
        return this.value;
    }
}
exports.PrismDIDMethodId = PrismDIDMethodId;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJpc21ESURNZXRob2RJZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kb21haW4vbW9kZWxzL1ByaXNtRElETWV0aG9kSWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscUNBQXVDO0FBRXZDLE1BQWEsZ0JBQWdCO0lBQ25CLEtBQUssQ0FBUztJQUV0QixZQUFZLGVBQWtDO1FBQzVDLElBQUksT0FBTyxlQUFlLEtBQUssUUFBUSxFQUFFO1lBQ3ZDLElBQUksQ0FBQyxLQUFLLEdBQUcsZUFBZSxDQUFDO1NBQzlCO2FBQU07WUFDTCxJQUFJLENBQUMsS0FBSyxHQUFHLGVBQWUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdkMsTUFBTSxZQUFZLEdBQUcsa0JBQWtCLENBQUM7WUFDeEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRTtnQkFDbkUsTUFBTSxJQUFJLG9CQUFXLENBQUMsNkJBQTZCLEVBQUUsQ0FBQzthQUN2RDtZQUNELE1BQU0scUJBQXFCLEdBQUcsb0NBQW9DLENBQUM7WUFDbkUsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQzNDLE1BQU0sSUFBSSxvQkFBVyxDQUFDLDZCQUE2QixFQUFFLENBQUM7YUFDdkQ7U0FDRjtJQUNILENBQUM7SUFFRCxJQUFJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCxRQUFRO1FBQ04sT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3BCLENBQUM7Q0FDRjtBQTFCRCw0Q0EwQkMifQ==