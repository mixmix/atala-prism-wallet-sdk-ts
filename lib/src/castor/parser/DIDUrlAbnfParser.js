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
exports.StringContext = exports.SearchparameterContext = exports.SearchContext = exports.FragContext = exports.QueryContext = exports.PathContext = exports.Method_specific_idContext = exports.Method_nameContext = exports.DidContext = exports.Did_urlContext = exports.DIDUrlAbnfParser = void 0;
const ATN_1 = require("antlr4ts/atn/ATN");
const ATNDeserializer_1 = require("antlr4ts/atn/ATNDeserializer");
const FailedPredicateException_1 = require("antlr4ts/FailedPredicateException");
const Parser_1 = require("antlr4ts/Parser");
const ParserRuleContext_1 = require("antlr4ts/ParserRuleContext");
const ParserATNSimulator_1 = require("antlr4ts/atn/ParserATNSimulator");
const RecognitionException_1 = require("antlr4ts/RecognitionException");
const Token_1 = require("antlr4ts/Token");
const VocabularyImpl_1 = require("antlr4ts/VocabularyImpl");
const Utils = __importStar(require("antlr4ts/misc/Utils"));
class DIDUrlAbnfParser extends Parser_1.Parser {
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
    static RULE_did_url = 0;
    static RULE_did = 1;
    static RULE_method_name = 2;
    static RULE_method_specific_id = 3;
    static RULE_path = 4;
    static RULE_query = 5;
    static RULE_frag = 6;
    static RULE_search = 7;
    static RULE_searchparameter = 8;
    static RULE_string = 9;
    // tslint:disable:no-trailing-whitespace
    static ruleNames = [
        "did_url", "did", "method_name", "method_specific_id", "path", "query",
        "frag", "search", "searchparameter", "string",
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
    static VOCABULARY = new VocabularyImpl_1.VocabularyImpl(DIDUrlAbnfParser._LITERAL_NAMES, DIDUrlAbnfParser._SYMBOLIC_NAMES, []);
    // @Override
    // @NotNull
    get vocabulary() {
        return DIDUrlAbnfParser.VOCABULARY;
    }
    // tslint:enable:no-trailing-whitespace
    // @Override
    get grammarFileName() { return "DIDUrlAbnf.g4"; }
    // @Override
    get ruleNames() { return DIDUrlAbnfParser.ruleNames; }
    // @Override
    get serializedATN() { return DIDUrlAbnfParser._serializedATN; }
    createFailedPredicateException(predicate, message) {
        return new FailedPredicateException_1.FailedPredicateException(this, predicate, message);
    }
    constructor(input) {
        super(input);
        this._interp = new ParserATNSimulator_1.ParserATNSimulator(DIDUrlAbnfParser._ATN, this);
    }
    // @RuleVersion(0)
    did_url() {
        let _localctx = new Did_urlContext(this._ctx, this.state);
        this.enterRule(_localctx, 0, DIDUrlAbnfParser.RULE_did_url);
        let _la;
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 20;
                this.did();
                this.state = 22;
                this._errHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this._input, 0, this._ctx)) {
                    case 1:
                        {
                            this.state = 21;
                            this.path();
                        }
                        break;
                }
                this.state = 25;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                if (_la === DIDUrlAbnfParser.T__1) {
                    {
                        this.state = 24;
                        this.query();
                    }
                }
                this.state = 28;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                if (_la === DIDUrlAbnfParser.T__0) {
                    {
                        this.state = 27;
                        this.match(DIDUrlAbnfParser.T__0);
                    }
                }
                this.state = 31;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                if (_la === DIDUrlAbnfParser.DIGIT || _la === DIDUrlAbnfParser.STRING) {
                    {
                        this.state = 30;
                        this.frag();
                    }
                }
                this.state = 33;
                this.match(DIDUrlAbnfParser.EOF);
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
    did() {
        let _localctx = new DidContext(this._ctx, this.state);
        this.enterRule(_localctx, 2, DIDUrlAbnfParser.RULE_did);
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 35;
                this.match(DIDUrlAbnfParser.SCHEMA);
                this.state = 36;
                this.match(DIDUrlAbnfParser.COLON);
                this.state = 37;
                this.method_name();
                this.state = 38;
                this.match(DIDUrlAbnfParser.COLON);
                this.state = 39;
                this.method_specific_id();
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
        this.enterRule(_localctx, 4, DIDUrlAbnfParser.RULE_method_name);
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 41;
                this.string();
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
        this.enterRule(_localctx, 6, DIDUrlAbnfParser.RULE_method_specific_id);
        let _la;
        try {
            let _alt;
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 49;
                this._errHandler.sync(this);
                _alt = this.interpreter.adaptivePredict(this._input, 5, this._ctx);
                while (_alt !== 2 && _alt !== ATN_1.ATN.INVALID_ALT_NUMBER) {
                    if (_alt === 1) {
                        {
                            {
                                this.state = 43;
                                this.string();
                                this.state = 45;
                                this._errHandler.sync(this);
                                _la = this._input.LA(1);
                                if (_la === DIDUrlAbnfParser.COLON) {
                                    {
                                        this.state = 44;
                                        this.match(DIDUrlAbnfParser.COLON);
                                    }
                                }
                            }
                        }
                    }
                    this.state = 51;
                    this._errHandler.sync(this);
                    _alt = this.interpreter.adaptivePredict(this._input, 5, this._ctx);
                }
                this.state = 52;
                this.string();
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
    path() {
        let _localctx = new PathContext(this._ctx, this.state);
        this.enterRule(_localctx, 8, DIDUrlAbnfParser.RULE_path);
        let _la;
        try {
            let _alt;
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 60;
                this._errHandler.sync(this);
                _alt = this.interpreter.adaptivePredict(this._input, 7, this._ctx);
                while (_alt !== 2 && _alt !== ATN_1.ATN.INVALID_ALT_NUMBER) {
                    if (_alt === 1) {
                        {
                            {
                                this.state = 55;
                                this._errHandler.sync(this);
                                _la = this._input.LA(1);
                                if (_la === DIDUrlAbnfParser.SLASH) {
                                    {
                                        this.state = 54;
                                        this.match(DIDUrlAbnfParser.SLASH);
                                    }
                                }
                                this.state = 57;
                                this.string();
                            }
                        }
                    }
                    this.state = 62;
                    this._errHandler.sync(this);
                    _alt = this.interpreter.adaptivePredict(this._input, 7, this._ctx);
                }
                this.state = 64;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                if (_la === DIDUrlAbnfParser.SLASH) {
                    {
                        this.state = 63;
                        this.match(DIDUrlAbnfParser.SLASH);
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
    query() {
        let _localctx = new QueryContext(this._ctx, this.state);
        this.enterRule(_localctx, 10, DIDUrlAbnfParser.RULE_query);
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 66;
                this.match(DIDUrlAbnfParser.T__1);
                this.state = 67;
                this.search();
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
    frag() {
        let _localctx = new FragContext(this._ctx, this.state);
        this.enterRule(_localctx, 12, DIDUrlAbnfParser.RULE_frag);
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 71;
                this._errHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this._input, 9, this._ctx)) {
                    case 1:
                        {
                            this.state = 69;
                            this.string();
                        }
                        break;
                    case 2:
                        {
                            this.state = 70;
                            this.match(DIDUrlAbnfParser.DIGIT);
                        }
                        break;
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
    search() {
        let _localctx = new SearchContext(this._ctx, this.state);
        this.enterRule(_localctx, 14, DIDUrlAbnfParser.RULE_search);
        let _la;
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 73;
                this.searchparameter();
                this.state = 78;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                while (_la === DIDUrlAbnfParser.T__2) {
                    {
                        {
                            this.state = 74;
                            this.match(DIDUrlAbnfParser.T__2);
                            this.state = 75;
                            this.searchparameter();
                        }
                    }
                    this.state = 80;
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
    searchparameter() {
        let _localctx = new SearchparameterContext(this._ctx, this.state);
        this.enterRule(_localctx, 16, DIDUrlAbnfParser.RULE_searchparameter);
        let _la;
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 81;
                this.string();
                this.state = 88;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                if (_la === DIDUrlAbnfParser.T__3) {
                    {
                        this.state = 82;
                        this.match(DIDUrlAbnfParser.T__3);
                        this.state = 86;
                        this._errHandler.sync(this);
                        switch (this.interpreter.adaptivePredict(this._input, 11, this._ctx)) {
                            case 1:
                                {
                                    this.state = 83;
                                    this.string();
                                }
                                break;
                            case 2:
                                {
                                    this.state = 84;
                                    this.match(DIDUrlAbnfParser.DIGIT);
                                }
                                break;
                            case 3:
                                {
                                    this.state = 85;
                                    this.match(DIDUrlAbnfParser.HEX);
                                }
                                break;
                        }
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
    string() {
        let _localctx = new StringContext(this._ctx, this.state);
        this.enterRule(_localctx, 18, DIDUrlAbnfParser.RULE_string);
        let _la;
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 90;
                _la = this._input.LA(1);
                if (!(_la === DIDUrlAbnfParser.DIGIT || _la === DIDUrlAbnfParser.STRING)) {
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
    static _serializedATN = "\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03\x12_\x04\x02" +
        "\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07" +
        "\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x03\x02\x03\x02\x05\x02" +
        "\x19\n\x02\x03\x02\x05\x02\x1C\n\x02\x03\x02\x05\x02\x1F\n\x02\x03\x02" +
        "\x05\x02\"\n\x02\x03\x02\x03\x02\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03" +
        "\x03\x03\x03\x04\x03\x04\x03\x05\x03\x05\x05\x050\n\x05\x07\x052\n\x05" +
        "\f\x05\x0E\x055\v\x05\x03\x05\x03\x05\x03\x06\x05\x06:\n\x06\x03\x06\x07" +
        "\x06=\n\x06\f\x06\x0E\x06@\v\x06\x03\x06\x05\x06C\n\x06\x03\x07\x03\x07" +
        "\x03\x07\x03\b\x03\b\x05\bJ\n\b\x03\t\x03\t\x03\t\x07\tO\n\t\f\t\x0E\t" +
        "R\v\t\x03\n\x03\n\x03\n\x03\n\x03\n\x05\nY\n\n\x05\n[\n\n\x03\v\x03\v" +
        "\x03\v\x02\x02\x02\f\x02\x02\x04\x02\x06\x02\b\x02\n\x02\f\x02\x0E\x02" +
        "\x10\x02\x12\x02\x14\x02\x02\x03\x04\x02\t\t\x11\x11\x02b\x02\x16\x03" +
        "\x02\x02\x02\x04%\x03\x02\x02\x02\x06+\x03\x02\x02\x02\b3\x03\x02\x02" +
        "\x02\n>\x03\x02\x02\x02\fD\x03\x02\x02\x02\x0EI\x03\x02\x02\x02\x10K\x03" +
        "\x02\x02\x02\x12S\x03\x02\x02\x02\x14\\\x03\x02\x02\x02\x16\x18\x05\x04" +
        "\x03\x02\x17\x19\x05\n\x06\x02\x18\x17\x03\x02\x02\x02\x18\x19\x03\x02" +
        "\x02\x02\x19\x1B\x03\x02\x02\x02\x1A\x1C\x05\f\x07\x02\x1B\x1A\x03\x02" +
        "\x02\x02\x1B\x1C\x03\x02\x02\x02\x1C\x1E\x03\x02\x02\x02\x1D\x1F\x07\x03" +
        "\x02\x02\x1E\x1D\x03\x02\x02\x02\x1E\x1F\x03\x02\x02\x02\x1F!\x03\x02" +
        "\x02\x02 \"\x05\x0E\b\x02! \x03\x02\x02\x02!\"\x03\x02\x02\x02\"#\x03" +
        "\x02\x02\x02#$\x07\x02\x02\x03$\x03\x03\x02\x02\x02%&\x07\x07\x02\x02" +
        "&\'\x07\x0E\x02\x02\'(\x05\x06\x04\x02()\x07\x0E\x02\x02)*\x05\b\x05\x02" +
        "*\x05\x03\x02\x02\x02+,\x05\x14\v\x02,\x07\x03\x02\x02\x02-/\x05\x14\v" +
        "\x02.0\x07\x0E\x02\x02/.\x03\x02\x02\x02/0\x03\x02\x02\x0202\x03\x02\x02" +
        "\x021-\x03\x02\x02\x0225\x03\x02\x02\x0231\x03\x02\x02\x0234\x03\x02\x02" +
        "\x0246\x03\x02\x02\x0253\x03\x02\x02\x0267\x05\x14\v\x027\t\x03\x02\x02" +
        "\x028:\x07\x12\x02\x0298\x03\x02\x02\x029:\x03\x02\x02\x02:;\x03\x02\x02" +
        "\x02;=\x05\x14\v\x02<9\x03\x02\x02\x02=@\x03\x02\x02\x02><\x03\x02\x02" +
        "\x02>?\x03\x02\x02\x02?B\x03\x02\x02\x02@>\x03\x02\x02\x02AC\x07\x12\x02" +
        "\x02BA\x03\x02\x02\x02BC\x03\x02\x02\x02C\v\x03\x02\x02\x02DE\x07\x04" +
        "\x02\x02EF\x05\x10\t\x02F\r\x03\x02\x02\x02GJ\x05\x14\v\x02HJ\x07\t\x02" +
        "\x02IG\x03\x02\x02\x02IH\x03\x02\x02\x02J\x0F\x03\x02\x02\x02KP\x05\x12" +
        "\n\x02LM\x07\x05\x02\x02MO\x05\x12\n\x02NL\x03\x02\x02\x02OR\x03\x02\x02" +
        "\x02PN\x03\x02\x02\x02PQ\x03\x02\x02\x02Q\x11\x03\x02\x02\x02RP\x03\x02" +
        "\x02\x02SZ\x05\x14\v\x02TX\x07\x06\x02\x02UY\x05\x14\v\x02VY\x07\t\x02" +
        "\x02WY\x07\x10\x02\x02XU\x03\x02\x02\x02XV\x03\x02\x02\x02XW\x03\x02\x02" +
        "\x02Y[\x03\x02\x02\x02ZT\x03\x02\x02\x02Z[\x03\x02\x02\x02[\x13\x03\x02" +
        "\x02\x02\\]\t\x02\x02\x02]\x15\x03\x02\x02\x02\x0F\x18\x1B\x1E!/39>BI" +
        "PXZ";
    static __ATN;
    static get _ATN() {
        if (!DIDUrlAbnfParser.__ATN) {
            DIDUrlAbnfParser.__ATN = new ATNDeserializer_1.ATNDeserializer().deserialize(Utils.toCharArray(DIDUrlAbnfParser._serializedATN));
        }
        return DIDUrlAbnfParser.__ATN;
    }
}
exports.DIDUrlAbnfParser = DIDUrlAbnfParser;
class Did_urlContext extends ParserRuleContext_1.ParserRuleContext {
    did() {
        return this.getRuleContext(0, DidContext);
    }
    EOF() { return this.getToken(DIDUrlAbnfParser.EOF, 0); }
    path() {
        return this.tryGetRuleContext(0, PathContext);
    }
    query() {
        return this.tryGetRuleContext(0, QueryContext);
    }
    frag() {
        return this.tryGetRuleContext(0, FragContext);
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() { return DIDUrlAbnfParser.RULE_did_url; }
    // @Override
    enterRule(listener) {
        if (listener.enterDid_url) {
            listener.enterDid_url(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitDid_url) {
            listener.exitDid_url(this);
        }
    }
}
exports.Did_urlContext = Did_urlContext;
class DidContext extends ParserRuleContext_1.ParserRuleContext {
    SCHEMA() { return this.getToken(DIDUrlAbnfParser.SCHEMA, 0); }
    COLON(i) {
        if (i === undefined) {
            return this.getTokens(DIDUrlAbnfParser.COLON);
        }
        else {
            return this.getToken(DIDUrlAbnfParser.COLON, i);
        }
    }
    method_name() {
        return this.getRuleContext(0, Method_nameContext);
    }
    method_specific_id() {
        return this.getRuleContext(0, Method_specific_idContext);
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() { return DIDUrlAbnfParser.RULE_did; }
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
    string() {
        return this.getRuleContext(0, StringContext);
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() { return DIDUrlAbnfParser.RULE_method_name; }
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
    string(i) {
        if (i === undefined) {
            return this.getRuleContexts(StringContext);
        }
        else {
            return this.getRuleContext(i, StringContext);
        }
    }
    COLON(i) {
        if (i === undefined) {
            return this.getTokens(DIDUrlAbnfParser.COLON);
        }
        else {
            return this.getToken(DIDUrlAbnfParser.COLON, i);
        }
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() { return DIDUrlAbnfParser.RULE_method_specific_id; }
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
class PathContext extends ParserRuleContext_1.ParserRuleContext {
    string(i) {
        if (i === undefined) {
            return this.getRuleContexts(StringContext);
        }
        else {
            return this.getRuleContext(i, StringContext);
        }
    }
    SLASH(i) {
        if (i === undefined) {
            return this.getTokens(DIDUrlAbnfParser.SLASH);
        }
        else {
            return this.getToken(DIDUrlAbnfParser.SLASH, i);
        }
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() { return DIDUrlAbnfParser.RULE_path; }
    // @Override
    enterRule(listener) {
        if (listener.enterPath) {
            listener.enterPath(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitPath) {
            listener.exitPath(this);
        }
    }
}
exports.PathContext = PathContext;
class QueryContext extends ParserRuleContext_1.ParserRuleContext {
    search() {
        return this.getRuleContext(0, SearchContext);
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() { return DIDUrlAbnfParser.RULE_query; }
    // @Override
    enterRule(listener) {
        if (listener.enterQuery) {
            listener.enterQuery(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitQuery) {
            listener.exitQuery(this);
        }
    }
}
exports.QueryContext = QueryContext;
class FragContext extends ParserRuleContext_1.ParserRuleContext {
    string() {
        return this.tryGetRuleContext(0, StringContext);
    }
    DIGIT() { return this.tryGetToken(DIDUrlAbnfParser.DIGIT, 0); }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() { return DIDUrlAbnfParser.RULE_frag; }
    // @Override
    enterRule(listener) {
        if (listener.enterFrag) {
            listener.enterFrag(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitFrag) {
            listener.exitFrag(this);
        }
    }
}
exports.FragContext = FragContext;
class SearchContext extends ParserRuleContext_1.ParserRuleContext {
    searchparameter(i) {
        if (i === undefined) {
            return this.getRuleContexts(SearchparameterContext);
        }
        else {
            return this.getRuleContext(i, SearchparameterContext);
        }
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() { return DIDUrlAbnfParser.RULE_search; }
    // @Override
    enterRule(listener) {
        if (listener.enterSearch) {
            listener.enterSearch(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitSearch) {
            listener.exitSearch(this);
        }
    }
}
exports.SearchContext = SearchContext;
class SearchparameterContext extends ParserRuleContext_1.ParserRuleContext {
    string(i) {
        if (i === undefined) {
            return this.getRuleContexts(StringContext);
        }
        else {
            return this.getRuleContext(i, StringContext);
        }
    }
    DIGIT() { return this.tryGetToken(DIDUrlAbnfParser.DIGIT, 0); }
    HEX() { return this.tryGetToken(DIDUrlAbnfParser.HEX, 0); }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() { return DIDUrlAbnfParser.RULE_searchparameter; }
    // @Override
    enterRule(listener) {
        if (listener.enterSearchparameter) {
            listener.enterSearchparameter(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitSearchparameter) {
            listener.exitSearchparameter(this);
        }
    }
}
exports.SearchparameterContext = SearchparameterContext;
class StringContext extends ParserRuleContext_1.ParserRuleContext {
    STRING() { return this.tryGetToken(DIDUrlAbnfParser.STRING, 0); }
    DIGIT() { return this.tryGetToken(DIDUrlAbnfParser.DIGIT, 0); }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() { return DIDUrlAbnfParser.RULE_string; }
    // @Override
    enterRule(listener) {
        if (listener.enterString) {
            listener.enterString(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitString) {
            listener.exitString(this);
        }
    }
}
exports.StringContext = StringContext;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRElEVXJsQWJuZlBhcnNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jYXN0b3IvcGFyc2VyL0RJRFVybEFibmZQYXJzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHVFQUF1RTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHdkUsMENBQXVDO0FBQ3ZDLGtFQUErRDtBQUMvRCxnRkFBNkU7QUFJN0UsNENBQXlDO0FBQ3pDLGtFQUErRDtBQUMvRCx3RUFBcUU7QUFHckUsd0VBQXFFO0FBSXJFLDBDQUF1QztBQUd2Qyw0REFBeUQ7QUFFekQsMkRBQTZDO0FBSTdDLE1BQWEsZ0JBQWlCLFNBQVEsZUFBTTtJQUNwQyxNQUFNLENBQVUsSUFBSSxHQUFHLENBQUMsQ0FBQztJQUN6QixNQUFNLENBQVUsSUFBSSxHQUFHLENBQUMsQ0FBQztJQUN6QixNQUFNLENBQVUsSUFBSSxHQUFHLENBQUMsQ0FBQztJQUN6QixNQUFNLENBQVUsSUFBSSxHQUFHLENBQUMsQ0FBQztJQUN6QixNQUFNLENBQVUsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUMzQixNQUFNLENBQVUsS0FBSyxHQUFHLENBQUMsQ0FBQztJQUMxQixNQUFNLENBQVUsS0FBSyxHQUFHLENBQUMsQ0FBQztJQUMxQixNQUFNLENBQVUsV0FBVyxHQUFHLENBQUMsQ0FBQztJQUNoQyxNQUFNLENBQVUsT0FBTyxHQUFHLENBQUMsQ0FBQztJQUM1QixNQUFNLENBQVUsSUFBSSxHQUFHLEVBQUUsQ0FBQztJQUMxQixNQUFNLENBQVUsTUFBTSxHQUFHLEVBQUUsQ0FBQztJQUM1QixNQUFNLENBQVUsS0FBSyxHQUFHLEVBQUUsQ0FBQztJQUMzQixNQUFNLENBQVUsVUFBVSxHQUFHLEVBQUUsQ0FBQztJQUNoQyxNQUFNLENBQVUsR0FBRyxHQUFHLEVBQUUsQ0FBQztJQUN6QixNQUFNLENBQVUsTUFBTSxHQUFHLEVBQUUsQ0FBQztJQUM1QixNQUFNLENBQVUsS0FB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