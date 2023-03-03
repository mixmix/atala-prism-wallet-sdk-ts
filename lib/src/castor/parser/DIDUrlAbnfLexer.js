"use strict";
// Generated from ./castor/parser/DIDUrlAbnf.g4 by ANTLR 4.9.0-SNAPSHOT
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
exports.DIDUrlAbnfLexer = void 0;
const ATNDeserializer_1 = require("antlr4ts/atn/ATNDeserializer");
const Lexer_1 = require("antlr4ts/Lexer");
const LexerATNSimulator_1 = require("antlr4ts/atn/LexerATNSimulator");
const VocabularyImpl_1 = require("antlr4ts/VocabularyImpl");
const Utils = __importStar(require("antlr4ts/misc/Utils"));
class DIDUrlAbnfLexer extends Lexer_1.Lexer {
    static T__0 = 1;
    static T__1 = 2;
    static T__2 = 3;
    static T__3 = 4;
    static SCHEMA = 5;
    static ALPHA = 6;
    static DIGIT = 7;
    static PCT_ENCODED = 8;
    static PERCENT = 9;
    static DASH = 10;
    static PERIOD = 11;
    static COLON = 12;
    static UNDERSCORE = 13;
    static HEX = 14;
    static STRING = 15;
    static SLASH = 16;
    // tslint:disable:no-trailing-whitespace
    static channelNames = [
        "DEFAULT_TOKEN_CHANNEL", "HIDDEN",
    ];
    // tslint:disable:no-trailing-whitespace
    static modeNames = [
        "DEFAULT_MODE",
    ];
    static ruleNames = [
        "T__0", "T__1", "T__2", "T__3", "D", "I", "SCHEMA", "LOWERCASE", "UPPERCASE",
        "ALPHA", "DIGIT", "PCT_ENCODED", "PERCENT", "DASH", "PERIOD", "COLON",
        "UNDERSCORE", "HEX", "STRING", "SLASH",
    ];
    static _LITERAL_NAMES = [
        undefined, "'#'", "'?'", "'&'", "'='", undefined, undefined, undefined,
        undefined, "'%'", "'-'", "'.'", "':'", "'_'", undefined, undefined, "'/'",
    ];
    static _SYMBOLIC_NAMES = [
        undefined, undefined, undefined, undefined, undefined, "SCHEMA", "ALPHA",
        "DIGIT", "PCT_ENCODED", "PERCENT", "DASH", "PERIOD", "COLON", "UNDERSCORE",
        "HEX", "STRING", "SLASH",
    ];
    static VOCABULARY = new VocabularyImpl_1.VocabularyImpl(DIDUrlAbnfLexer._LITERAL_NAMES, DIDUrlAbnfLexer._SYMBOLIC_NAMES, []);
    // @Override
    // @NotNull
    get vocabulary() {
        return DIDUrlAbnfLexer.VOCABULARY;
    }
    // tslint:enable:no-trailing-whitespace
    constructor(input) {
        super(input);
        this._interp = new LexerATNSimulator_1.LexerATNSimulator(DIDUrlAbnfLexer._ATN, this);
    }
    // @Override
    get grammarFileName() { return "DIDUrlAbnf.g4"; }
    // @Override
    get ruleNames() { return DIDUrlAbnfLexer.ruleNames; }
    // @Override
    get serializedATN() { return DIDUrlAbnfLexer._serializedATN; }
    // @Override
    get channelNames() { return DIDUrlAbnfLexer.channelNames; }
    // @Override
    get modeNames() { return DIDUrlAbnfLexer.modeNames; }
    static _serializedATN = "\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x02\x12g\b\x01\x04" +
        "\x02\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04" +
        "\x07\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r" +
        "\x04\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t\x12" +
        "\x04\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x03\x02\x03\x02\x03\x03\x03" +
        "\x03\x03\x04\x03\x04\x03\x05\x03\x05\x03\x06\x03\x06\x03\x07\x03\x07\x03" +
        "\b\x03\b\x03\b\x03\b\x03\t\x03\t\x03\n\x03\n\x03\v\x03\v\x05\vB\n\v\x03" +
        "\f\x03\f\x03\r\x03\r\x03\r\x03\r\x03\x0E\x03\x0E\x03\x0F\x03\x0F\x03\x10" +
        "\x03\x10\x03\x11\x03\x11\x03\x12\x03\x12\x03\x13\x03\x13\x03\x13\x06\x13" +
        "W\n\x13\r\x13\x0E\x13X\x03\x14\x03\x14\x05\x14]\n\x14\x03\x14\x03\x14" +
        "\x07\x14a\n\x14\f\x14\x0E\x14d\v\x14\x03\x15\x03\x15\x02\x02\x02\x16\x03" +
        "\x02\x03\x05\x02\x04\x07\x02\x05\t\x02\x06\v\x02\x02\r\x02\x02\x0F\x02" +
        "\x07\x11\x02\x02\x13\x02\x02\x15\x02\b\x17\x02\t\x19\x02\n\x1B\x02\v\x1D" +
        "\x02\f\x1F\x02\r!\x02\x0E#\x02\x0F%\x02\x10\'\x02\x11)\x02\x12\x03\x02" +
        "\n\x04\x02FFff\x04\x02KKkk\x03\x02c|\x03\x02C\\\x03\x022;\x05\x022;CH" +
        "ch\x06\x022;C\\c|\x80\x80\x07\x02--/02;C\\c|\x02g\x02\x03\x03\x02\x02" +
        "\x02\x02\x05\x03\x02\x02\x02\x02\x07\x03\x02\x02\x02\x02\t\x03\x02\x02" +
        "\x02\x02\x0F\x03\x02\x02\x02\x02\x15\x03\x02\x02\x02\x02\x17\x03\x02\x02" +
        "\x02\x02\x19\x03\x02\x02\x02\x02\x1B\x03\x02\x02\x02\x02\x1D\x03\x02\x02" +
        "\x02\x02\x1F\x03\x02\x02\x02\x02!\x03\x02\x02\x02\x02#\x03\x02\x02\x02" +
        "\x02%\x03\x02\x02\x02\x02\'\x03\x02\x02\x02\x02)\x03\x02\x02\x02\x03+" +
        "\x03\x02\x02\x02\x05-\x03\x02\x02\x02\x07/\x03\x02\x02\x02\t1\x03\x02" +
        "\x02\x02\v3\x03\x02\x02\x02\r5\x03\x02\x02\x02\x0F7\x03\x02\x02\x02\x11" +
        ";\x03\x02\x02\x02\x13=\x03\x02\x02\x02\x15A\x03\x02\x02\x02\x17C\x03\x02" +
        "\x02\x02\x19E\x03\x02\x02\x02\x1BI\x03\x02\x02\x02\x1DK\x03\x02\x02\x02" +
        "\x1FM\x03\x02\x02\x02!O\x03\x02\x02\x02#Q\x03\x02\x02\x02%V\x03\x02\x02" +
        "\x02\'\\\x03\x02\x02\x02)e\x03\x02\x02\x02+,\x07%\x02\x02,\x04\x03\x02" +
        "\x02\x02-.\x07A\x02\x02.\x06\x03\x02\x02\x02/0\x07(\x02\x020\b\x03\x02" +
        "\x02\x0212\x07?\x02\x022\n\x03\x02\x02\x0234\t\x02\x02\x024\f\x03\x02" +
        "\x02\x0256\t\x03\x02\x026\x0E\x03\x02\x02\x0278\x05\v\x06\x0289\x05\r" +
        "\x07\x029:\x05\v\x06\x02:\x10\x03\x02\x02\x02;<\t\x04\x02\x02<\x12\x03" +
        "\x02\x02\x02=>\t\x05\x02\x02>\x14\x03\x02\x02\x02?B\x05\x11\t\x02@B\x05" +
        "\x13\n\x02A?\x03\x02\x02\x02A@\x03\x02\x02\x02B\x16\x03\x02\x02\x02CD" +
        "\t\x06\x02\x02D\x18\x03\x02\x02\x02EF\x05\x1B\x0E\x02FG\x05%\x13\x02G" +
        "H\x05%\x13\x02H\x1A\x03\x02\x02\x02IJ\x07\'\x02\x02J\x1C\x03\x02\x02\x02" +
        "KL\x07/\x02\x02L\x1E\x03\x02\x02\x02MN\x070\x02\x02N \x03\x02\x02\x02" +
        "OP\x07<\x02\x02P\"\x03\x02\x02\x02QR\x07a\x02\x02R$\x03\x02\x02\x02ST" +
        "\x07\'\x02\x02TU\t\x07\x02\x02UW\t\x07\x02\x02VS\x03\x02\x02\x02WX\x03" +
        "\x02\x02\x02XV\x03\x02\x02\x02XY\x03\x02\x02\x02Y&\x03\x02\x02\x02Z]\t" +
        "\b\x02\x02[]\x05%\x13\x02\\Z\x03\x02\x02\x02\\[\x03\x02\x02\x02]b\x03" +
        "\x02\x02\x02^a\t\t\x02\x02_a\x05%\x13\x02`^\x03\x02\x02\x02`_\x03\x02" +
        "\x02\x02ad\x03\x02\x02\x02b`\x03\x02\x02\x02bc\x03\x02\x02\x02c(\x03\x02" +
        "\x02\x02db\x03\x02\x02\x02ef\x071\x02\x02f*\x03\x02\x02\x02\b\x02AX\\" +
        "`b\x02";
    static __ATN;
    static get _ATN() {
        if (!DIDUrlAbnfLexer.__ATN) {
            DIDUrlAbnfLexer.__ATN = new ATNDeserializer_1.ATNDeserializer().deserialize(Utils.toCharArray(DIDUrlAbnfLexer._serializedATN));
        }
        return DIDUrlAbnfLexer.__ATN;
    }
}
exports.DIDUrlAbnfLexer = DIDUrlAbnfLexer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRElEVXJsQWJuZkxleGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Nhc3Rvci9wYXJzZXIvRElEVXJsQWJuZkxleGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSx1RUFBdUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSXZFLGtFQUErRDtBQUUvRCwwQ0FBdUM7QUFDdkMsc0VBQW1FO0FBS25FLDREQUF5RDtBQUV6RCwyREFBNkM7QUFHN0MsTUFBYSxlQUFnQixTQUFRLGFBQUs7SUFDbEMsTUFBTSxDQUFVLElBQUksR0FBRyxDQUFDLENBQUM7SUFDekIsTUFBTSxDQUFVLElBQUksR0FBRyxDQUFDLENBQUM7SUFDekIsTUFBTSxDQUFVLElBQUksR0FBRyxDQUFDLENBQUM7SUFDekIsTUFBTSxDQUFVLElBQUksR0FBRyxDQUFDLENBQUM7SUFDekIsTUFBTSxDQUFVLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFDM0IsTUFBTSxDQUFVLEtBQUssR0FBRyxDQUFDLENBQUM7SUFDMUIsTUFBTSxDQUFVLEtBQUssR0FBRyxDQUFDLENBQUM7SUFDMUIsTUFBTSxDQUFVLFdBQVcsR0FBRyxDQUFDLENBQUM7SUFDaEMsTUFBTSxDQUFVLE9BQU8sR0FBRyxDQUFDLENBQUM7SUFDNUIsTUFBTSxDQUFVLElBQUksR0FBRyxFQUFFLENBQUM7SUFDMUIsTUFBTSxDQUFVLE1BQU0sR0FBRyxFQUFFLENBQUM7SUFDNUIsTUFBTSxDQUFVLEtBQUssR0FBRyxFQUFFLENBQUM7SUFDM0IsTUFBTSxDQUFVLFVBQVUsR0FBRyxFQUFFLENBQUM7SUFDaEMsTUFBTSxDQUFVLEdBQUcsR0FBRyxFQUFFLENBQUM7SUFDekIsTUFBTSxDQUFVLE1BQU0sR0FBRyxFQUFFLENBQUM7SUFDNUIsTUFBTSxDQUFVLEtBQUssR0FBRyxFQUFFLENBQUM7SUFFbEMsd0NBQXdDO0lBQ2pDLE1BQU0sQ0FBVSxZQUFZLEdBQWE7UUFDL0MsdUJBQXVC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