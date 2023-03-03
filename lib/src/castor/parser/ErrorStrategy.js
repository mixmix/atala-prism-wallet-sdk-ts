"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorStrategy = void 0;
const DefaultErrorStrategy_1 = require("antlr4ts/DefaultErrorStrategy");
const Castor_1 = require("../../domain/models/errors/Castor");
class ErrorStrategy extends DefaultErrorStrategy_1.DefaultErrorStrategy {
    recover(recognizer, e) {
        let context = recognizer.context;
        while (context != null) {
            context.exception = e;
            context = context.parent;
        }
        throw new Castor_1.InvalidDIDString(`Invalid Did char found at [line ${recognizer.currentToken?.line}, col ${recognizer.currentToken?.charPositionInLine}] "${recognizer.currentToken?.text}"`);
    }
    recoverInline(recognizer) {
        var context = recognizer.context;
        while (context != null) {
            context = context.parent;
        }
        throw new Castor_1.InvalidDIDString(`Invalid Did char found at [line ${recognizer.currentToken?.line}, col ${recognizer.currentToken?.charPositionInLine}] "${recognizer.currentToken?.text}"`);
    }
}
exports.ErrorStrategy = ErrorStrategy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXJyb3JTdHJhdGVneS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jYXN0b3IvcGFyc2VyL0Vycm9yU3RyYXRlZ3kudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0Esd0VBQXFFO0FBQ3JFLDhEQUFxRTtBQUVyRSxNQUFhLGFBQWMsU0FBUSwyQ0FBb0I7SUFDckQsT0FBTyxDQUFDLFVBQWtCLEVBQUUsQ0FBdUI7UUFDakQsSUFBSSxPQUFPLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQztRQUNqQyxPQUFPLE9BQU8sSUFBSSxJQUFJLEVBQUU7WUFDdEIsT0FBTyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7WUFDdEIsT0FBTyxHQUFHLE9BQU8sQ0FBQyxNQUFPLENBQUM7U0FDM0I7UUFDRCxNQUFNLElBQUkseUJBQWdCLENBQ3hCLG1DQUFtQyxVQUFVLENBQUMsWUFBWSxFQUFFLElBQUksU0FBUyxVQUFVLENBQUMsWUFBWSxFQUFFLGtCQUFrQixNQUFNLFVBQVUsQ0FBQyxZQUFZLEVBQUUsSUFBSSxHQUFHLENBQzNKLENBQUM7SUFDSixDQUFDO0lBQ0QsYUFBYSxDQUFDLFVBQWtCO1FBQzlCLElBQUksT0FBTyxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUM7UUFDakMsT0FBTyxPQUFPLElBQUksSUFBSSxFQUFFO1lBQ3RCLE9BQU8sR0FBRyxPQUFPLENBQUMsTUFBTyxDQUFDO1NBQzNCO1FBQ0QsTUFBTSxJQUFJLHlCQUFnQixDQUN4QixtQ0FBbUMsVUFBVSxDQUFDLFlBQVksRUFBRSxJQUFJLFNBQVMsVUFBVSxDQUFDLFlBQVksRUFBRSxrQkFBa0IsTUFBTSxVQUFVLENBQUMsWUFBWSxFQUFFLElBQUksR0FBRyxDQUMzSixDQUFDO0lBQ0osQ0FBQztDQUNGO0FBcEJELHNDQW9CQyJ9