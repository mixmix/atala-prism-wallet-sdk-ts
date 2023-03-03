"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = void 0;
const domain_1 = require("../../domain");
const DIDAbnfLexer_1 = require("./DIDAbnfLexer");
const antlr4ts_1 = require("antlr4ts");
const DIDAbnfParser_1 = require("./DIDAbnfParser");
const ParseTreeWalker_1 = require("antlr4ts/tree/ParseTreeWalker");
const Castor_1 = require("../../domain/models/errors/Castor");
const ErrorStrategy_1 = require("./ErrorStrategy");
class DIDListener {
    scheme;
    methodName;
    methodId;
    exitMethod_specific_id(ctx) {
        this.methodId = ctx.text;
    }
    exitMethod_name(ctx) {
        this.methodName = ctx.text;
    }
    exitDid(ctx) {
        this.scheme = ctx.SCHEMA()?.text;
    }
}
function parse(didString) {
    const lexer = new DIDAbnfLexer_1.DIDAbnfLexer(antlr4ts_1.CharStreams.fromString(didString));
    const tokenStream = new antlr4ts_1.CommonTokenStream(lexer);
    const parser = new DIDAbnfParser_1.DIDAbnfParser(tokenStream);
    const listener = new DIDListener();
    parser.errorHandler = new ErrorStrategy_1.ErrorStrategy();
    const context = parser.did();
    ParseTreeWalker_1.ParseTreeWalker.DEFAULT.walk(listener, context);
    if (!listener.scheme) {
        throw new Castor_1.InvalidDIDString("Invalid DID string, missing scheme");
    }
    if (!listener.methodName) {
        throw new Castor_1.InvalidDIDString("Invalid DID string, missing method name");
    }
    if (!listener.methodId) {
        throw new Castor_1.InvalidDIDString("Invalid DID string, missing method ID");
    }
    return new domain_1.DID(listener.scheme, listener.methodName, listener.methodId);
}
exports.parse = parse;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRElEUGFyc2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Nhc3Rvci9wYXJzZXIvRElEUGFyc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHlDQUFtQztBQUNuQyxpREFBOEM7QUFDOUMsdUNBQTBEO0FBQzFELG1EQUt5QjtBQUV6QixtRUFBZ0U7QUFFaEUsOERBQXFFO0FBQ3JFLG1EQUFnRDtBQUVoRCxNQUFNLFdBQVc7SUFDUixNQUFNLENBQVU7SUFDaEIsVUFBVSxDQUFVO0lBQ3BCLFFBQVEsQ0FBVTtJQUV6QixzQkFBc0IsQ0FBQyxHQUE4QjtRQUNuRCxJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7SUFDM0IsQ0FBQztJQUNELGVBQWUsQ0FBQyxHQUF1QjtRQUNyQyxJQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7SUFDN0IsQ0FBQztJQUNELE9BQU8sQ0FBQyxHQUFlO1FBQ3JCLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxFQUFFLElBQUksQ0FBQztJQUNuQyxDQUFDO0NBQ0Y7QUFFRCxTQUFnQixLQUFLLENBQUMsU0FBaUI7SUFDckMsTUFBTSxLQUFLLEdBQUcsSUFBSSwyQkFBWSxDQUFDLHNCQUFXLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDbEUsTUFBTSxXQUFXLEdBQUcsSUFBSSw0QkFBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqRCxNQUFNLE1BQU0sR0FBRyxJQUFJLDZCQUFhLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDOUMsTUFBTSxRQUFRLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztJQUVuQyxNQUFNLENBQUMsWUFBWSxHQUFHLElBQUksNkJBQWEsRUFBRSxDQUFDO0lBRTFDLE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUU3QixpQ0FBZSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBNkIsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNyRSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRTtRQUNwQixNQUFNLElBQUkseUJBQWdCLENBQUMsb0NBQW9DLENBQUMsQ0FBQztLQUNsRTtJQUNELElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFO1FBQ3hCLE1BQU0sSUFBSSx5QkFBZ0IsQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFDO0tBQ3ZFO0lBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUU7UUFDdEIsTUFBTSxJQUFJLHlCQUFnQixDQUFDLHVDQUF1QyxDQUFDLENBQUM7S0FDckU7SUFFRCxPQUFPLElBQUksWUFBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDMUUsQ0FBQztBQXRCRCxzQkFzQkMifQ==