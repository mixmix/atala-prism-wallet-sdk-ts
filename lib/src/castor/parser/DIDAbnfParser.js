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
exports.IdcharContext = exports.Method_specific_idContext = exports.Method_nameContext = exports.DidContext = exports.DIDAbnfParser = void 0;
const ATNDeserializer_1 = require("antlr4ts/atn/ATNDeserializer");
const FailedPredicateException_1 = require("antlr4ts/FailedPredicateException");
const Parser_1 = require("antlr4ts/Parser");
const ParserRuleContext_1 = require("antlr4ts/ParserRuleContext");
const ParserATNSimulator_1 = require("antlr4ts/atn/ParserATNSimulator");
const RecognitionException_1 = require("antlr4ts/RecognitionException");
const Token_1 = require("antlr4ts/Token");
const VocabularyImpl_1 = require("antlr4ts/VocabularyImpl");
const Utils = __importStar(require("antlr4ts/misc/Utils"));
class DIDAbnfParser extends Parser_1.Parser {
    static SCHEMA = 1;
    static ALPHA = 2;
    static DIGIT = 3;
    static PCT_ENCODED = 4;
    static PERCENT = 5;
    static DASH = 6;
    static PERIOD = 7;
    static COLON = 8;
    static UNDERSCORE = 9;
    static RULE_did = 0;
    static RULE_method_name = 1;
    static RULE_method_specific_id = 2;
    static RULE_idchar = 3;
    // tslint:disable:no-trailing-whitespace
    static ruleNames = [
        "did",
        "method_name",
        "method_specific_id",
        "idchar",
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
    static VOCABULARY = new VocabularyImpl_1.VocabularyImpl(DIDAbnfParser._LITERAL_NAMES, DIDAbnfParser._SYMBOLIC_NAMES, []);
    // @Override
    // @NotNull
    get vocabulary() {
        return DIDAbnfParser.VOCABULARY;
    }
    // tslint:enable:no-trailing-whitespace
    // @Override
    get grammarFileName() {
        return "DIDAbnf.g4";
    }
    // @Override
    get ruleNames() {
        return DIDAbnfParser.ruleNames;
    }
    // @Override
    get serializedATN() {
        return DIDAbnfParser._serializedATN;
    }
    createFailedPredicateException(predicate, message) {
        return new FailedPredicateException_1.FailedPredicateException(this, predicate, message);
    }
    constructor(input) {
        super(input);
        this._interp = new ParserATNSimulator_1.ParserATNSimulator(DIDAbnfParser._ATN, this);
    }
    // @RuleVersion(0)
    did() {
        let _localctx = new DidContext(this._ctx, this.state);
        this.enterRule(_localctx, 0, DIDAbnfParser.RULE_did);
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 8;
                this.match(DIDAbnfParser.SCHEMA);
                this.state = 9;
                this.match(DIDAbnfParser.COLON);
                this.state = 10;
                this.method_name();
                this.state = 11;
                this.match(DIDAbnfParser.COLON);
                this.state = 12;
                this.method_specific_id();
                this.state = 13;
                this.match(DIDAbnfParser.EOF);
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    method_name() {
        let _localctx = new Method_nameContext(this._ctx, this.state);
        this.enterRule(_localctx, 2, DIDAbnfParser.RULE_method_name);
        let _la;
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 18;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                while (_la === DIDAbnfParser.ALPHA || _la === DIDAbnfParser.DIGIT) {
                    {
                        {
                            this.state = 15;
                            _la = this._input.LA(1);
                            if (!(_la === DIDAbnfParser.ALPHA || _la === DIDAbnfParser.DIGIT)) {
                                this._errHandler.recoverInline(this);
                            }
                            else {
                                if (this._input.LA(1) === Token_1.Token.EOF) {
                                    this.matchedEOF = true;
                                }
                                this._errHandler.reportMatch(this);
                                this.consume();
                            }
                        }
                    }
                    this.state = 20;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                }
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    method_specific_id() {
        let _localctx = new Method_specific_idContext(this._ctx, this.state);
        this.enterRule(_localctx, 4, DIDAbnfParser.RULE_method_specific_id);
        let _la;
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 24;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                while ((_la & ~0x1f) === 0 &&
                    ((1 << _la) &
                        ((1 << DIDAbnfParser.ALPHA) |
                            (1 << DIDAbnfParser.DIGIT) |
                            (1 << DIDAbnfParser.PCT_ENCODED) |
                            (1 << DIDAbnfParser.DASH) |
                            (1 << DIDAbnfParser.PERIOD) |
                            (1 << DIDAbnfParser.UNDERSCORE))) !==
                        0) {
                    {
                        {
                            this.state = 21;
                            this.idchar();
                        }
                    }
                    this.state = 26;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                }
                this.state = 33;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                if (_la === DIDAbnfParser.COLON) {
                    {
                        this.state = 27;
                        this.match(DIDAbnfParser.COLON);
                        this.state = 29;
                        this._errHandler.sync(this);
                        _la = this._input.LA(1);
                        do {
                            {
                                {
                                    this.state = 28;
                                    this.idchar();
                                }
                            }
                            this.state = 31;
                            this._errHandler.sync(this);
                            _la = this._input.LA(1);
                        } while ((_la & ~0x1f) === 0 &&
                            ((1 << _la) &
                                ((1 << DIDAbnfParser.ALPHA) |
                                    (1 << DIDAbnfParser.DIGIT) |
                                    (1 << DIDAbnfParser.PCT_ENCODED) |
                                    (1 << DIDAbnfParser.DASH) |
                                    (1 << DIDAbnfParser.PERIOD) |
                                    (1 << DIDAbnfParser.UNDERSCORE))) !==
                                0);
                    }
                }
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    idchar() {
        let _localctx = new IdcharContext(this._ctx, this.state);
        this.enterRule(_localctx, 6, DIDAbnfParser.RULE_idchar);
        let _la;
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 35;
                _la = this._input.LA(1);
                if (!((_la & ~0x1f) === 0 &&
                    ((1 << _la) &
                        ((1 << DIDAbnfParser.ALPHA) |
                            (1 << DIDAbnfParser.DIGIT) |
                            (1 << DIDAbnfParser.PCT_ENCODED) |
                            (1 << DIDAbnfParser.DASH) |
                            (1 << DIDAbnfParser.PERIOD) |
                            (1 << DIDAbnfParser.UNDERSCORE))) !==
                        0)) {
                    this._errHandler.recoverInline(this);
                }
                else {
                    if (this._input.LA(1) === Token_1.Token.EOF) {
                        this.matchedEOF = true;
                    }
                    this._errHandler.reportMatch(this);
                    this.consume();
                }
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    static _serializedATN = "\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03\v(\x04\x02\t" +
        "\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x03\x02\x03\x02\x03\x02" +
        "\x03\x02\x03\x02\x03\x02\x03\x02\x03\x03\x07\x03\x13\n\x03\f\x03\x0E\x03" +
        "\x16\v\x03\x03\x04\x07\x04\x19\n\x04\f\x04\x0E\x04\x1C\v\x04\x03\x04\x03" +
        "\x04\x06\x04 \n\x04\r\x04\x0E\x04!\x05\x04$\n\x04\x03\x05\x03\x05\x03" +
        "\x05\x02\x02\x02\x06\x02\x02\x04\x02\x06\x02\b\x02\x02\x04\x03\x02\x04" +
        "\x05\x05\x02\x04\x06\b\t\v\v\x02'\x02\n\x03\x02\x02\x02\x04\x14\x03\x02" +
        "\x02\x02\x06\x1A\x03\x02\x02\x02\b%\x03\x02\x02\x02\n\v\x07\x03\x02\x02" +
        "\v\f\x07\n\x02\x02\f\r\x05\x04\x03\x02\r\x0E\x07\n\x02\x02\x0E\x0F\x05" +
        "\x06\x04\x02\x0F\x10\x07\x02\x02\x03\x10\x03\x03\x02\x02\x02\x11\x13\t" +
        "\x02\x02\x02\x12\x11\x03\x02\x02\x02\x13\x16\x03\x02\x02\x02\x14\x12\x03" +
        "\x02\x02\x02\x14\x15\x03\x02\x02\x02\x15\x05\x03\x02\x02\x02\x16\x14\x03" +
        "\x02\x02\x02\x17\x19\x05\b\x05\x02\x18\x17\x03\x02\x02\x02\x19\x1C\x03" +
        "\x02\x02\x02\x1A\x18\x03\x02\x02\x02\x1A\x1B\x03\x02\x02\x02\x1B#\x03" +
        "\x02\x02\x02\x1C\x1A\x03\x02\x02\x02\x1D\x1F\x07\n\x02\x02\x1E \x05\b" +
        "\x05\x02\x1F\x1E\x03\x02\x02\x02 !\x03\x02\x02\x02!\x1F\x03\x02\x02\x02" +
        '!"\x03\x02\x02\x02"$\x03\x02\x02\x02#\x1D\x03\x02\x02\x02#$\x03\x02' +
        "\x02\x02$\x07\x03\x02\x02\x02%&\t\x03\x02\x02&\t\x03\x02\x02\x02\x06\x14" +
        "\x1A!#";
    static __ATN;
    static get _ATN() {
        if (!DIDAbnfParser.__ATN) {
            DIDAbnfParser.__ATN = new ATNDeserializer_1.ATNDeserializer().deserialize(Utils.toCharArray(DIDAbnfParser._serializedATN));
        }
        return DIDAbnfParser.__ATN;
    }
}
exports.DIDAbnfParser = DIDAbnfParser;
class DidContext extends ParserRuleContext_1.ParserRuleContext {
    SCHEMA() {
        return this.getToken(DIDAbnfParser.SCHEMA, 0);
    }
    COLON(i) {
        if (i === undefined) {
            return this.getTokens(DIDAbnfParser.COLON);
        }
        else {
            return this.getToken(DIDAbnfParser.COLON, i);
        }
    }
    method_name() {
        return this.getRuleContext(0, Method_nameContext);
    }
    method_specific_id() {
        return this.getRuleContext(0, Method_specific_idContext);
    }
    EOF() {
        return this.getToken(DIDAbnfParser.EOF, 0);
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return DIDAbnfParser.RULE_did;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterDid) {
            listener.enterDid(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitDid) {
            listener.exitDid(this);
        }
    }
}
exports.DidContext = DidContext;
class Method_nameContext extends ParserRuleContext_1.ParserRuleContext {
    ALPHA(i) {
        if (i === undefined) {
            return this.getTokens(DIDAbnfParser.ALPHA);
        }
        else {
            return this.getToken(DIDAbnfParser.ALPHA, i);
        }
    }
    DIGIT(i) {
        if (i === undefined) {
            return this.getTokens(DIDAbnfParser.DIGIT);
        }
        else {
            return this.getToken(DIDAbnfParser.DIGIT, i);
        }
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return DIDAbnfParser.RULE_method_name;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterMethod_name) {
            listener.enterMethod_name(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitMethod_name) {
            listener.exitMethod_name(this);
        }
    }
}
exports.Method_nameContext = Method_nameContext;
class Method_specific_idContext extends ParserRuleContext_1.ParserRuleContext {
    idchar(i) {
        if (i === undefined) {
            return this.getRuleContexts(IdcharContext);
        }
        else {
            return this.getRuleContext(i, IdcharContext);
        }
    }
    COLON() {
        return this.tryGetToken(DIDAbnfParser.COLON, 0);
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return DIDAbnfParser.RULE_method_specific_id;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterMethod_specific_id) {
            listener.enterMethod_specific_id(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitMethod_specific_id) {
            listener.exitMethod_specific_id(this);
        }
    }
}
exports.Method_specific_idContext = Method_specific_idContext;
class IdcharContext extends ParserRuleContext_1.ParserRuleContext {
    ALPHA() {
        return this.tryGetToken(DIDAbnfParser.ALPHA, 0);
    }
    DIGIT() {
        return this.tryGetToken(DIDAbnfParser.DIGIT, 0);
    }
    PERIOD() {
        return this.tryGetToken(DIDAbnfParser.PERIOD, 0);
    }
    DASH() {
        return this.tryGetToken(DIDAbnfParser.DASH, 0);
    }
    UNDERSCORE() {
        return this.tryGetToken(DIDAbnfParser.UNDERSCORE, 0);
    }
    PCT_ENCODED() {
        return this.tryGetToken(DIDAbnfParser.PCT_ENCODED, 0);
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() {
        return DIDAbnfParser.RULE_idchar;
    }
    // @Override
    enterRule(listener) {
        if (listener.enterIdchar) {
            listener.enterIdchar(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitIdchar) {
            listener.exitIdchar(this);
        }
    }
}
exports.IdcharContext = IdcharContext;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRElEQWJuZlBhcnNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jYXN0b3IvcGFyc2VyL0RJREFibmZQYXJzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLG9FQUFvRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHcEUsa0VBQStEO0FBQy9ELGdGQUE2RTtBQUM3RSw0Q0FBeUM7QUFDekMsa0VBQStEO0FBQy9ELHdFQUFxRTtBQUNyRSx3RUFBcUU7QUFFckUsMENBQXVDO0FBR3ZDLDREQUF5RDtBQUV6RCwyREFBNkM7QUFJN0MsTUFBYSxhQUFjLFNBQVEsZUFBTTtJQUNoQyxNQUFNLENBQVUsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUMzQixNQUFNLENBQVUsS0FBSyxHQUFHLENBQUMsQ0FBQztJQUMxQixNQUFNLENBQVUsS0FBSyxHQUFHLENBQUMsQ0FBQztJQUMxQixNQUFNLENBQVUsV0FBVyxHQUFHLENBQUMsQ0FBQztJQUNoQyxNQUFNLENBQVUsT0FBTyxHQUFHLENBQUMsQ0FBQztJQUM1QixNQUFNLENBQVUsSUFBSSxHQUFHLENBQUMsQ0FBQztJQUN6QixNQUFNLENBQVUsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUMzQixNQUFNLENBQVUsS0FBSyxHQUFHLENBQUMsQ0FBQztJQUMxQixNQUFNLENBQVUsVUFBVSxHQUFHLENBQUMsQ0FBQztJQUMvQixNQUFNLENBQVUsUUFBUSxHQUFHLENBQUMsQ0FBQztJQUM3QixNQUFNLENBQVUsZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDO0lBQ3JDLE1BQU0sQ0FBVSx1QkFBdUIsR0FBRyxDQUFDLENBQUM7SUFDNUMsTUFBTSxDQUFVLFdBQVcsR0FBRyxDQUFDLENBQUM7SUFDdkMsd0NBQXdDO0lBQ2pDLE1BQU0sQ0FBVSxTQUFTLEdBQWE7UUFDM0MsS0FBSztRQUNMLGFBQWE7UUFDYixvQkFBb0I7UUFDcEIsUUFBUTtLQUNULENBQUM7SUFFTSxNQUFNLENBQVUsY0FBYyxHQUE4QjtRQUNsRSxTQUFTO1FBQ1QsU0FBUztRQUNULFNBQVM7UUFDVCxTQUFTO1FBQ1QsU0FBUztRQUNULEtBQUs7UUFDTCxLQUFLO1FBQ0wsS0FBSztRQUNMLEtBQUs7UUFDTCxLQUFLO0tBQ04sQ0FBQztJQUNNLE1BQU0sQ0FBVSxlQUFlLEdBQThCO1FBQ25FLFNBQVM7UUFDVCxRQUFRO1FBQ1IsT0FBTztRQUNQLE9BQU87UUFDUCxhQUFhO1FBQ2IsU0FBUztRQUNULE1BQU07UUFDTixRQUFRO1FBQ1IsT0FBTztRQUNQLFlBQVk7S0FDYixDQUFDO0lBQ0ssTUFBTSxDQUFVLFVBQVUsR0FBZSxJQUFJLCtCQUFjLENBQ2hFLGFBQWEsQ0FBQyxjQUFjLEVBQzVCLGFBQWEsQ0FBQyxlQUFlLEVBQzdCLEVBQUUsQ0FDSCxDQUFDO0lBRUYsWUFBWTtJQUNaLFdBQVc7SUFDWCxJQUFXLFVBQVU7UUFDbkIsT0FBTyxhQUFhLENBQUMsVUFBVSxDQUFDO0lBQ2xDLENBQUM7SUFDRCx1Q0FBdUM7SUFFdkMsWUFBWTtJQUNaLElBQVcsZUFBZTtRQUN4QixPQUFPLFlBQVksQ0FBQztJQUN0QixDQUFDO0lBRUQsWUFBWTtJQUNaLElBQVcsU0FBUztRQUNsQixPQUFPLGFBQWEsQ0FBQyxTQUFTLENBQUM7SUFDakMsQ0FBQztJQUVELFlBQVk7SUFDWixJQUFXLGFBQWE7UUFDdEIsT0FBTyxhQUFhLENBQUMsY0FBYyxDQUFDO0lBQ3RDLENBQUM7SUFFUyw4QkFBOEIsQ0FDdEMsU0FBa0IsRUFDbEIsT0FBZ0I7UUFFaEIsT0FBTyxJQUFJLG1EQUF3QixDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUVELFlBQVksS0FBa0I7UUFDNUIsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2IsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLHVDQUFrQixDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbEUsQ0FBQztJQUNELGtCQUFrQjtJQUNYLEdBQUc7UUFDUixJQUFJLFNBQVMsR0FBZSxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNsRSxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUUsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3JELElBQUk7WUFDRixJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNqQztnQkFDRSxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztnQkFDZixJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDakMsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7Z0JBQ2YsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2hDLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO2dCQUNoQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQ25CLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO2dCQUNoQixJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDaEMsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7Z0JBQ2hCLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO2dCQUMxQixJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztnQkFDaEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDL0I7U0FDRjtRQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ1gsSUFBSSxFQUFFLFlBQVksMkNBQW9CLEVBQUU7Z0JBQ3RDLFNBQVMsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO2dCQUN6QixJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBQ3ZDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQzthQUNwQztpQkFBTTtnQkFDTCxNQUFNLEVBQUUsQ0FBQzthQUNWO1NBQ0Y7Z0JBQVM7WUFDUixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDakI7UUFDRCxPQUFPLFNBQVMsQ0FBQztJQUNuQixDQUFDO0lBQ0Qsa0JBQWtCO0lBQ1gsV0FBVztRQUNoQixJQUFJLFNBQVMsR0FBdUIsSUFBSSxrQkFBa0IsQ0FDeEQsSUFBSSxDQUFDLElBQUksRUFDVCxJQUFJLENBQUMsS0FBSyxDQUNYLENBQUM7UUFDRixJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUUsYUFBYSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDN0QsSUFBSSxHQUFXLENBQUM7UUFDaEIsSUFBSTtZQUNGLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2pDO2dCQUNFLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO2dCQUNoQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDNUIsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN4QixPQUFPLEdBQUcsS0FBSyxhQUFhLENBQUMsS0FBSyxJQUFJLEdBQUcsS0FBSyxhQUFhLENBQUMsS0FBSyxFQUFFO29CQUNqRTt3QkFDRTs0QkFDRSxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQzs0QkFDaEIsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUN4QixJQUNFLENBQUMsQ0FBQyxHQUFHLEtBQUssYUFBYSxDQUFDLEtBQUssSUFBSSxHQUFHLEtBQUssYUFBYSxDQUFDLEtBQUssQ0FBQyxFQUM3RDtnQ0FDQSxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQzs2QkFDdEM7aUNBQU07Z0NBQ0wsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxhQUFLLENBQUMsR0FBRyxFQUFFO29DQUNuQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztpQ0FDeEI7Z0NBRUQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7Z0NBQ25DLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQzs2QkFDaEI7eUJBQ0Y7cUJBQ0Y7b0JBQ0QsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7b0JBQ2hCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUM1QixHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ3pCO2FBQ0Y7U0FDRjtRQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ1gsSUFBSSxFQUFFLFlBQVksMkNBQW9CLEVBQUU7Z0JBQ3RDLFNBQVMsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO2dCQUN6QixJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBQ3ZDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQzthQUNwQztpQkFBTTtnQkFDTCxNQUFNLEVBQUUsQ0FBQzthQUNWO1NBQ0Y7Z0JBQVM7WUFDUixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDakI7UUFDRCxPQUFPLFNBQVMsQ0FBQztJQUNuQixDQUFDO0lBQ0Qsa0JBQWtCO0lBQ1gsa0JBQWtCO1FBQ3ZCLElBQUksU0FBUyxHQUE4QixJQUFJLHlCQUF5QixDQUN0RSxJQUFJLENBQUMsSUFBSSxFQUNULElBQUksQ0FBQyxLQUFLLENBQ1gsQ0FBQztRQUNGLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLENBQUMsRUFBRSxhQUFhLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUNwRSxJQUFJLEdBQVcsQ0FBQztRQUNoQixJQUFJO1lBQ0YsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDakM7Z0JBQ0UsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7Z0JBQ2hCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUM1QixHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hCLE9BQ0UsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO29CQUNuQixDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQzt3QkFDVCxDQUFDLENBQUMsQ0FBQyxJQUFJLGFBQWEsQ0FBQyxLQUFLLENBQUM7NEJBQ3pCLENBQUMsQ0FBQyxJQUFJLGFBQWEsQ0FBQyxLQUFLLENBQUM7NEJBQzFCLENBQUMsQ0FBQyxJQUFJLGFBQWEsQ0FBQyxXQUFXLENBQUM7NEJBQ2hDLENBQUMsQ0FBQyxJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUM7NEJBQ3pCLENBQUMsQ0FBQyxJQUFJLGFBQWEsQ0FBQyxNQUFNLENBQUM7NEJBQzNCLENBQUMsQ0FBQyxJQUFJLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO3dCQUNuQyxDQUFDLEVBQ0g7b0JBQ0E7d0JBQ0U7NEJBQ0UsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7NEJBQ2hCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQzt5QkFDZjtxQkFDRjtvQkFDRCxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztvQkFDaEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQzVCLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDekI7Z0JBQ0QsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7Z0JBQ2hCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUM1QixHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hCLElBQUksR0FBRyxLQUFLLGFBQWEsQ0FBQyxLQUFLLEVBQUU7b0JBQy9CO3dCQUNFLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO3dCQUNoQixJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDaEMsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7d0JBQ2hCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUM1QixHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3hCLEdBQUc7NEJBQ0Q7Z0NBQ0U7b0NBQ0UsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7b0NBQ2hCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztpQ0FDZjs2QkFDRjs0QkFDRCxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQzs0QkFDaEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7NEJBQzVCLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzt5QkFDekIsUUFDQyxDQUFDLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7NEJBQ25CLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDO2dDQUNULENBQUMsQ0FBQyxDQUFDLElBQUksYUFBYSxDQUFDLEtBQUssQ0FBQztvQ0FDekIsQ0FBQyxDQUFDLElBQUksYUFBYSxDQUFDLEtBQUssQ0FBQztvQ0FDMUIsQ0FBQyxDQUFDLElBQUksYUFBYSxDQUFDLFdBQVcsQ0FBQztvQ0FDaEMsQ0FBQyxDQUFDLElBQUksYUFBYSxDQUFDLElBQUksQ0FBQztvQ0FDekIsQ0FBQyxDQUFDLElBQUksYUFBYSxDQUFDLE1BQU0sQ0FBQztvQ0FDM0IsQ0FBQyxDQUFDLElBQUksYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0NBQ25DLENBQUMsRUFDSDtxQkFDSDtpQkFDRjthQUNGO1NBQ0Y7UUFBQyxPQUFPLEVBQUUsRUFBRTtZQUNYLElBQUksRUFBRSxZQUFZLDJDQUFvQixFQUFFO2dCQUN0QyxTQUFTLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztnQkFDekIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUN2QyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7YUFDcEM7aUJBQU07Z0JBQ0wsTUFBTSxFQUFFLENBQUM7YUFDVjtTQUNGO2dCQUFTO1lBQ1IsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ2pCO1FBQ0QsT0FBTyxTQUFTLENBQUM7SUFDbkIsQ0FBQztJQUNELGtCQUFrQjtJQUNYLE1BQU07UUFDWCxJQUFJLFNBQVMsR0FBa0IsSUFBSSxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDeEUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN4RCxJQUFJLEdBQVcsQ0FBQztRQUNoQixJQUFJO1lBQ0YsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDakM7Z0JBQ0UsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7Z0JBQ2hCLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDeEIsSUFDRSxDQUFDLENBQ0MsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO29CQUNuQixDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQzt3QkFDVCxDQUFDLENBQUMsQ0FBQyxJQUFJLGFBQWEsQ0FBQyxLQUFLLENBQUM7NEJBQ3pCLENBQUMsQ0FBQyxJQUFJLGFBQWEsQ0FBQyxLQUFLLENBQUM7NEJBQzFCLENBQUMsQ0FBQyxJQUFJLGFBQWEsQ0FBQyxXQUFXLENBQUM7NEJBQ2hDLENBQUMsQ0FBQyxJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUM7NEJBQ3pCLENBQUMsQ0FBQyxJQUFJLGFBQWEsQ0FBQyxNQUFNLENBQUM7NEJBQzNCLENBQUMsQ0FBQyxJQUFJLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO3dCQUNuQyxDQUFDLENBQ0osRUFDRDtvQkFDQSxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDdEM7cUJBQU07b0JBQ0wsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxhQUFLLENBQUMsR0FBRyxFQUFFO3dCQUNuQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztxQkFDeEI7b0JBRUQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ25DLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztpQkFDaEI7YUFDRjtTQUNGO1FBQUMsT0FBTyxFQUFFLEVBQUU7WUFDWCxJQUFJLEVBQUUsWUFBWSwyQ0FBb0IsRUFBRTtnQkFDdEMsU0FBUyxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7Z0JBQ3pCLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDdkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2FBQ3BDO2lCQUFNO2dCQUNMLE1BQU0sRUFBRSxDQUFDO2FBQ1Y7U0FDRjtnQkFBUztZQUNSLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUNqQjtRQUNELE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUM7SUFFTSxNQUFNLENBQVUsY0FBYyxHQUNuQyx1RUFBdUU7UUFDdkUsd0VBQXdFO1FBQ3hFLDBFQUEwRTtRQUMxRSwwRUFBMEU7UUFDMUUsdUVBQXVFO1FBQ3ZFLHdFQUF3RTtRQUN4RSx5RUFBeUU7UUFDekUseUVBQXlFO1FBQ3pFLHdFQUF3RTtRQUN4RSx3RUFBd0U7UUFDeEUsMEVBQTBFO1FBQzFFLDBFQUEwRTtRQUMxRSx3RUFBd0U7UUFDeEUsdUVBQXVFO1FBQ3ZFLHVFQUF1RTtRQUN2RSx5RUFBeUU7UUFDekUscUVBQXFFO1FBQ3JFLDBFQUEwRTtRQUMxRSxRQUFRLENBQUM7SUFDSixNQUFNLENBQUMsS0FBSyxDQUFNO0lBQ2xCLE1BQU0sS0FBSyxJQUFJO1FBQ3BCLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFO1lBQ3hCLGFBQWEsQ0FBQyxLQUFLLEdBQUcsSUFBSSxpQ0FBZSxFQUFFLENBQUMsV0FBVyxDQUNyRCxLQUFLLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsQ0FDaEQsQ0FBQztTQUNIO1FBRUQsT0FBTyxhQUFhLENBQUMsS0FBSyxDQUFDO0lBQzdCLENBQUM7O0FBdlVILHNDQXdVQztBQUVELE1BQWEsVUFBVyxTQUFRLHFDQUFpQjtJQUN4QyxNQUFNO1FBQ1gsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUdNLEtBQUssQ0FBQyxDQUFVO1FBQ3JCLElBQUksQ0FBQyxLQUFLLFNBQVMsRUFBRTtZQUNuQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzVDO2FBQU07WUFDTCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztTQUM5QztJQUNILENBQUM7SUFDTSxXQUFXO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBQ00sa0JBQWtCO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQUUseUJBQXlCLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBQ00sR0FBRztRQUNSLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFDRCxZQUFZLE1BQXFDLEVBQUUsYUFBcUI7UUFDdEUsS0FBSyxDQUFDLE1BQU0sRUFBRSxhQUFhLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBQ0QsWUFBWTtJQUNaLElBQVcsU0FBUztRQUNsQixPQUFPLGFBQWEsQ0FBQyxRQUFRLENBQUM7SUFDaEMsQ0FBQztJQUNELFlBQVk7SUFDTCxTQUFTLENBQUMsUUFBeUI7UUFDeEMsSUFBSSxRQUFRLENBQUMsUUFBUSxFQUFFO1lBQ3JCLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDekI7SUFDSCxDQUFDO0lBQ0QsWUFBWTtJQUNMLFFBQVEsQ0FBQyxRQUF5QjtRQUN2QyxJQUFJLFFBQVEsQ0FBQyxPQUFPLEVBQUU7WUFDcEIsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN4QjtJQUNILENBQUM7Q0FDRjtBQXpDRCxnQ0F5Q0M7QUFFRCxNQUFhLGtCQUFtQixTQUFRLHFDQUFpQjtJQUdoRCxLQUFLLENBQUMsQ0FBVTtRQUNyQixJQUFJLENBQUMsS0FBSyxTQUFTLEVBQUU7WUFDbkIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM1QzthQUFNO1lBQ0wsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDOUM7SUFDSCxDQUFDO0lBR00sS0FBSyxDQUFDLENBQVU7UUFDckIsSUFBSSxDQUFDLEtBQUssU0FBUyxFQUFFO1lBQ25CLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDNUM7YUFBTTtZQUNMLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQzlDO0lBQ0gsQ0FBQztJQUNELFlBQVksTUFBcUMsRUFBRSxhQUFxQjtRQUN0RSxLQUFLLENBQUMsTUFBTSxFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFDRCxZQUFZO0lBQ1osSUFBVyxTQUFTO1FBQ2xCLE9BQU8sYUFBYSxDQUFDLGdCQUFnQixDQUFDO0lBQ3hDLENBQUM7SUFDRCxZQUFZO0lBQ0wsU0FBUyxDQUFDLFFBQXlCO1FBQ3hDLElBQUksUUFBUSxDQUFDLGdCQUFnQixFQUFFO1lBQzdCLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNqQztJQUNILENBQUM7SUFDRCxZQUFZO0lBQ0wsUUFBUSxDQUFDLFFBQXlCO1FBQ3ZDLElBQUksUUFBUSxDQUFDLGVBQWUsRUFBRTtZQUM1QixRQUFRLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2hDO0lBQ0gsQ0FBQztDQUNGO0FBdENELGdEQXNDQztBQUVELE1BQWEseUJBQTBCLFNBQVEscUNBQWlCO0lBR3ZELE1BQU0sQ0FBQyxDQUFVO1FBQ3RCLElBQUksQ0FBQyxLQUFLLFNBQVMsRUFBRTtZQUNuQixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDNUM7YUFBTTtZQUNMLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQUUsYUFBYSxDQUFDLENBQUM7U0FDOUM7SUFDSCxDQUFDO0lBQ00sS0FBSztRQUNWLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFDRCxZQUFZLE1BQXFDLEVBQUUsYUFBcUI7UUFDdEUsS0FBSyxDQUFDLE1BQU0sRUFBRSxhQUFhLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBQ0QsWUFBWTtJQUNaLElBQVcsU0FBUztRQUNsQixPQUFPLGFBQWEsQ0FBQyx1QkFBdUIsQ0FBQztJQUMvQyxDQUFDO0lBQ0QsWUFBWTtJQUNMLFNBQVMsQ0FBQyxRQUF5QjtRQUN4QyxJQUFJLFFBQVEsQ0FBQyx1QkFBdUIsRUFBRTtZQUNwQyxRQUFRLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDeEM7SUFDSCxDQUFDO0lBQ0QsWUFBWTtJQUNMLFFBQVEsQ0FBQyxRQUF5QjtRQUN2QyxJQUFJLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRTtZQUNuQyxRQUFRLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDdkM7SUFDSCxDQUFDO0NBQ0Y7QUFoQ0QsOERBZ0NDO0FBRUQsTUFBYSxhQUFjLFNBQVEscUNBQWlCO0lBQzNDLEtBQUs7UUFDVixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBQ00sS0FBSztRQUNWLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFDTSxNQUFNO1FBQ1gsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUNNLElBQUk7UUFDVCxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBQ00sVUFBVTtRQUNmLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFDTSxXQUFXO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFDRCxZQUFZLE1BQXFDLEVBQUUsYUFBcUI7UUFDdEUsS0FBSyxDQUFDLE1BQU0sRUFBRSxhQUFhLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBQ0QsWUFBWTtJQUNaLElBQVcsU0FBUztRQUNsQixPQUFPLGFBQWEsQ0FBQyxXQUFXLENBQUM7SUFDbkMsQ0FBQztJQUNELFlBQVk7SUFDTCxTQUFTLENBQUMsUUFBeUI7UUFDeEMsSUFBSSxRQUFRLENBQUMsV0FBVyxFQUFFO1lBQ3hCLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDNUI7SUFDSCxDQUFDO0lBQ0QsWUFBWTtJQUNMLFFBQVEsQ0FBQyxRQUF5QjtRQUN2QyxJQUFJLFFBQVEsQ0FBQyxVQUFVLEVBQUU7WUFDdkIsUUFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUMzQjtJQUNILENBQUM7Q0FDRjtBQXRDRCxzQ0FzQ0MifQ==