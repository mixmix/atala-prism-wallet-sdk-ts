"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = void 0;
const domain_1 = require("../../domain");
const antlr4ts_1 = require("antlr4ts");
const ParseTreeWalker_1 = require("antlr4ts/tree/ParseTreeWalker");
const Castor_1 = require("../../domain/models/errors/Castor");
const url_1 = require("url");
const DIDUrlAbnfParser_1 = require("./DIDUrlAbnfParser");
const ErrorStrategy_1 = require("./ErrorStrategy");
const DIDUrlAbnfLexer_1 = require("./DIDUrlAbnfLexer");
class DIDUrlListener {
    scheme;
    methodName;
    methodId;
    path = new Array();
    query = new Map();
    fragment;
    exitPath(ctx) {
        this.path = ctx.children?.map((t) => t.text).filter((t) => t != "/") || [];
    }
    exitFrag(ctx) {
        this.fragment = ctx.text;
    }
    exitMethod_name(ctx) {
        this.methodName = ctx.text;
    }
    exitMethod_specific_id(ctx) {
        this.methodId = ctx.text;
    }
    exitDid(ctx) {
        this.scheme = ctx.SCHEMA()?.text;
    }
    exitSearch(ctx) {
        console.info(">>>>>>>>", url_1.URLSearchParams, require("url"));
        const params = new url_1.URLSearchParams(ctx.text);
        for (const [key, value] of params.entries()) {
            this.query.set(key, value);
        }
    }
}
function parse(didString) {
    const lexer = new DIDUrlAbnfLexer_1.DIDUrlAbnfLexer(antlr4ts_1.CharStreams.fromString(didString));
    const tokenStream = new antlr4ts_1.CommonTokenStream(lexer);
    const parser = new DIDUrlAbnfParser_1.DIDUrlAbnfParser(tokenStream);
    const listener = new DIDUrlListener();
    const context = parser.did_url();
    parser.errorHandler = new ErrorStrategy_1.ErrorStrategy();
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
    const did = new domain_1.DID(listener.scheme, listener.methodName, listener.methodId);
    return new domain_1.DIDUrl(did, listener.path || [], listener.query, listener.fragment);
}
exports.parse = parse;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRElEVXJsUGFyc2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Nhc3Rvci9wYXJzZXIvRElEVXJsUGFyc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHlDQUEyQztBQUMzQyx1Q0FBMEQ7QUFDMUQsbUVBQWdFO0FBRWhFLDhEQUFxRTtBQUVyRSw2QkFBc0M7QUFFdEMseURBUTRCO0FBQzVCLG1EQUFnRDtBQUNoRCx1REFBb0Q7QUFFcEQsTUFBTSxjQUFjO0lBQ1gsTUFBTSxDQUFVO0lBQ2hCLFVBQVUsQ0FBVTtJQUNwQixRQUFRLENBQVU7SUFDbEIsSUFBSSxHQUFrQixJQUFJLEtBQUssRUFBRSxDQUFDO0lBQ2xDLEtBQUssR0FBd0IsSUFBSSxHQUFHLEVBQUUsQ0FBQztJQUN2QyxRQUFRLENBQVU7SUFFekIsUUFBUSxDQUFDLEdBQWdCO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDN0UsQ0FBQztJQUNELFFBQVEsQ0FBQyxHQUFnQjtRQUN2QixJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7SUFDM0IsQ0FBQztJQUNELGVBQWUsQ0FBQyxHQUF1QjtRQUNyQyxJQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7SUFDN0IsQ0FBQztJQUNELHNCQUFzQixDQUFDLEdBQThCO1FBQ25ELElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztJQUMzQixDQUFDO0lBQ0QsT0FBTyxDQUFDLEdBQWU7UUFDckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLEVBQUUsSUFBSSxDQUFDO0lBQ25DLENBQUM7SUFDRCxVQUFVLENBQUMsR0FBa0I7UUFDM0IsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUscUJBQWUsRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQTtRQUN6RCxNQUFNLE1BQU0sR0FBRyxJQUFJLHFCQUFlLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdDLEtBQUssTUFBTSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDM0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQzVCO0lBQ0gsQ0FBQztDQUNGO0FBRUQsU0FBZ0IsS0FBSyxDQUFDLFNBQWlCO0lBQ3JDLE1BQU0sS0FBSyxHQUFHLElBQUksaUNBQWUsQ0FBQyxzQkFBVyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQ3JFLE1BQU0sV0FBVyxHQUFHLElBQUksNEJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakQsTUFBTSxNQUFNLEdBQUcsSUFBSSxtQ0FBZ0IsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNqRCxNQUFNLFFBQVEsR0FBRyxJQUFJLGNBQWMsRUFBRSxDQUFDO0lBQ3RDLE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUVqQyxNQUFNLENBQUMsWUFBWSxHQUFHLElBQUksNkJBQWEsRUFBRSxDQUFDO0lBRTFDLGlDQUFlLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUE2QixFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3JFLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFO1FBQ3BCLE1BQU0sSUFBSSx5QkFBZ0IsQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO0tBQ2xFO0lBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUU7UUFDeEIsTUFBTSxJQUFJLHlCQUFnQixDQUFDLHlDQUF5QyxDQUFDLENBQUM7S0FDdkU7SUFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRTtRQUN0QixNQUFNLElBQUkseUJBQWdCLENBQUMsdUNBQXVDLENBQUMsQ0FBQztLQUNyRTtJQUNELE1BQU0sR0FBRyxHQUFHLElBQUksWUFBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDN0UsT0FBTyxJQUFJLGVBQU0sQ0FDZixHQUFHLEVBQ0gsUUFBUSxDQUFDLElBQUksSUFBSSxFQUFFLEVBQ25CLFFBQVEsQ0FBQyxLQUFLLEVBQ2QsUUFBUSxDQUFDLFFBQVEsQ0FDbEIsQ0FBQztBQUNKLENBQUM7QUExQkQsc0JBMEJDIn0=