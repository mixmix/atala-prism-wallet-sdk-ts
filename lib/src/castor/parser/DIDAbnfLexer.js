"use strict";
// Generated from ./castor/parser/DIDAbnf.g4 by ANTLR 4.9.0-SNAPSHOT
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DIDAbnfLexer = void 0;
const ATNDeserializer_1 = require("antlr4ts/atn/ATNDeserializer");
const Lexer_1 = require("antlr4ts/Lexer");
const LexerATNSimulator_1 = require("antlr4ts/atn/LexerATNSimulator");
const VocabularyImpl_1 = require("antlr4ts/VocabularyImpl");
const Utils = __importStar(require("antlr4ts/misc/Utils"));
class DIDAbnfLexer extends Lexer_1.Lexer {
    static SCHEMA = 1;
    static ALPHA = 2;
    static DIGIT = 3;
    static PCT_ENCODED = 4;
    static PERCENT = 5;
    static DASH = 6;
    static PERIOD = 7;
    static COLON = 8;
    static UNDERSCORE = 9;
    // tslint:disable:no-trailing-whitespace
    static channelNames = [
        "DEFAULT_TOKEN_CHANNEL",
        "HIDDEN",
    ];
    // tslint:disable:no-trailing-whitespace
    static modeNames = ["DEFAULT_MODE"];
    static ruleNames = [
        "D",
        "I",
        "SCHEMA",
        "LOWERCASE",
        "UPPERCASE",
        "ALPHA",
        "HEX",
        "DIGIT",
        "PCT_ENCODED",
        "PERCENT",
        "DASH",
        "PERIOD",
        "COLON",
        "UNDERSCORE",
    ];
    static _LITERAL_NAMES = [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        "'%'",
        "'-'",
        "'.'",
        "':'",
        "'_'",
    ];
    static _SYMBOLIC_NAMES = [
        undefined,
        "SCHEMA",
        "ALPHA",
        "DIGIT",
        "PCT_ENCODED",
        "PERCENT",
        "DASH",
        "PERIOD",
        "COLON",
        "UNDERSCORE",
    ];
    static VOCABULARY = new VocabularyImpl_1.VocabularyImpl(DIDAbnfLexer._LITERAL_NAMES, DIDAbnfLexer._SYMBOLIC_NAMES, []);
    // @Override
    // @NotNull
    get vocabulary() {
        return DIDAbnfLexer.VOCABULARY;
    }
    // tslint:enable:no-trailing-whitespace
    constructor(input) {
        super(input);
        this._interp = new LexerATNSimulator_1.LexerATNSimulator(DIDAbnfLexer._ATN, this);
    }
    // @Override
    get grammarFileName() {
        return "DIDAbnf.g4";
    }
    // @Override
    get ruleNames() {
        return DIDAbnfLexer.ruleNames;
    }
    // @Override
    get serializedATN() {
        return DIDAbnfLexer._serializedATN;
    }
    // @Override
    get channelNames() {
        return DIDAbnfLexer.channelNames;
    }
    // @Override
    get modeNames() {
        return DIDAbnfLexer.modeNames;
    }
    static _serializedATN = "\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x02\vA\b\x01\x04" +
        "\x02\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04" +
        "\x07\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r" +
        "\x04\x0E\t\x0E\x04\x0F\t\x0F\x03\x02\x03\x02\x03\x03\x03\x03\x03\x04\x03" +
        "\x04\x03\x04\x03\x04\x03\x05\x03\x05\x03\x06\x03\x06\x03\x07\x03\x07\x05" +
        "\x07.\n\x07\x03\b\x03\b\x03\t\x03\t\x03\n\x03\n\x03\n\x03\n\x03\v\x03" +
        "\v\x03\f\x03\f\x03\r\x03\r\x03\x0E\x03\x0E\x03\x0F\x03\x0F\x02\x02\x02" +
        "\x10\x03\x02\x02\x05\x02\x02\x07\x02\x03\t\x02\x02\v\x02\x02\r\x02\x04" +
        "\x0F\x02\x02\x11\x02\x05\x13\x02\x06\x15\x02\x07\x17\x02\b\x19\x02\t\x1B" +
        "\x02\n\x1D\x02\v\x03\x02\b\x04\x02FFff\x04\x02KKkk\x03\x02c|\x03\x02C" +
        "\\\x05\x022;CHch\x03\x022;\x02<\x02\x07\x03\x02\x02\x02\x02\r\x03\x02" +
        "\x02\x02\x02\x11\x03\x02\x02\x02\x02\x13\x03\x02\x02\x02\x02\x15\x03\x02" +
        "\x02\x02\x02\x17\x03\x02\x02\x02\x02\x19\x03\x02\x02\x02\x02\x1B\x03\x02" +
        "\x02\x02\x02\x1D\x03\x02\x02\x02\x03\x1F\x03\x02\x02\x02\x05!\x03\x02" +
        "\x02\x02\x07#\x03\x02\x02\x02\t'\x03\x02\x02\x02\v)\x03\x02\x02\x02\r" +
        "-\x03\x02\x02\x02\x0F/\x03\x02\x02\x02\x111\x03\x02\x02\x02\x133\x03\x02" +
        "\x02\x02\x157\x03\x02\x02\x02\x179\x03\x02\x02\x02\x19;\x03\x02\x02\x02" +
        "\x1B=\x03\x02\x02\x02\x1D?\x03\x02\x02\x02\x1F \t\x02\x02\x02 \x04\x03" +
        '\x02\x02\x02!"\t\x03\x02\x02"\x06\x03\x02\x02\x02#$\x05\x03\x02\x02' +
        "$%\x05\x05\x03\x02%&\x05\x03\x02\x02&\b\x03\x02\x02\x02'(\t\x04\x02\x02" +
        "(\n\x03\x02\x02\x02)*\t\x05\x02\x02*\f\x03\x02\x02\x02+.\x05\t\x05\x02" +
        ",.\x05\v\x06\x02-+\x03\x02\x02\x02-,\x03\x02\x02\x02.\x0E\x03\x02\x02" +
        "\x02/0\t\x06\x02\x020\x10\x03\x02\x02\x0212\t\x07\x02\x022\x12\x03\x02" +
        "\x02\x0234\x05\x15\v\x0245\x05\x0F\b\x0256\x05\x0F\b\x026\x14\x03\x02" +
        "\x02\x0278\x07'\x02\x028\x16\x03\x02\x02\x029:\x07/\x02\x02:\x18\x03" +
        "\x02\x02\x02;<\x070\x02\x02<\x1A\x03\x02\x02\x02=>\x07<\x02\x02>\x1C\x03" +
        "\x02\x02\x02?@\x07a\x02\x02@\x1E\x03\x02\x02\x02\x04\x02-\x02";
    static __ATN;
    static get _ATN() {
        if (!DIDAbnfLexer.__ATN) {
            DIDAbnfLexer.__ATN = new ATNDeserializer_1.ATNDeserializer().deserialize(Utils.toCharArray(DIDAbnfLexer._serializedATN));
        }
        return DIDAbnfLexer.__ATN;
    }
}
exports.DIDAbnfLexer = DIDAbnfLexer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRElEQWJuZkxleGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Nhc3Rvci9wYXJzZXIvRElEQWJuZkxleGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxvRUFBb0U7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR3BFLGtFQUErRDtBQUUvRCwwQ0FBdUM7QUFDdkMsc0VBQW1FO0FBRW5FLDREQUF5RDtBQUV6RCwyREFBNkM7QUFFN0MsTUFBYSxZQUFhLFNBQVEsYUFBSztJQUM5QixNQUFNLENBQVUsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUMzQixNQUFNLENBQVUsS0FBSyxHQUFHLENBQUMsQ0FBQztJQUMxQixNQUFNLENBQVUsS0FBSyxHQUFHLENBQUMsQ0FBQztJQUMxQixNQUFNLENBQVUsV0FBVyxHQUFHLENBQUMsQ0FBQztJQUNoQyxNQUFNLENBQVUsT0FBTyxHQUFHLENBQUMsQ0FBQztJQUM1QixNQUFNLENBQVUsSUFBSSxHQUFHLENBQUMsQ0FBQztJQUN6QixNQUFNLENBQVUsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUMzQixNQUFNLENBQVUsS0FBSyxHQUFHLENBQUMsQ0FBQztJQUMxQixNQUFNLENBQVUsVUFBVSxHQUFHLENBQUMsQ0FBQztJQUV0Qyx3Q0FBd0M7SUFDakMsTUFBTSxDQUFVLFlBQVksR0FBYTtRQUM5Qyx1QkFBdUI7UUFDdkIsUUFBUTtLQUNULENBQUM7SUFFRix3Q0FBd0M7SUFDakMsTUFBTSxDQUFVLFNBQVMsR0FBYSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBRXZELE1BQU0sQ0FBVSxTQUFTLEdBQWE7UUFDM0MsR0FBRztRQUNILEdBQUc7UUFDSCxRQUFRO1FBQ1IsV0FBVztRQUNYLFdBQVc7UUFDWCxPQUFPO1FBQ1AsS0FBSztRQUNMLE9BQU87UUFDUCxhQUFhO1FBQ2IsU0FBUztRQUNULE1BQU07UUFDTixRQUFRO1FBQ1IsT0FBTztRQUNQLFlBQVk7S0FDYixDQUFDO0lB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