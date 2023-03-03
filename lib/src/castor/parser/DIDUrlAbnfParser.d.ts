import { ATN } from "antlr4ts/atn/ATN";
import { FailedPredicateException } from "antlr4ts/FailedPredicateException";
import { Parser } from "antlr4ts/Parser";
import { ParserRuleContext } from "antlr4ts/ParserRuleContext";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { TokenStream } from "antlr4ts/TokenStream";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { DIDUrlAbnfListener } from "./DIDUrlAbnfListener";
export declare class DIDUrlAbnfParser extends Parser {
    static readonly T__0 = 1;
    static readonly T__1 = 2;
    static readonly T__2 = 3;
    static readonly T__3 = 4;
    static readonly SCHEMA = 5;
    static readonly ALPHA = 6;
    static readonly DIGIT = 7;
    static readonly PCT_ENCODED = 8;
    static readonly PERCENT = 9;
    static readonly DASH = 10;
    static readonly PERIOD = 11;
    static readonly COLON = 12;
    static readonly UNDERSCORE = 13;
    static readonly HEX = 14;
    static readonly STRING = 15;
    static readonly SLASH = 16;
    static readonly RULE_did_url = 0;
    static readonly RULE_did = 1;
    static readonly RULE_method_name = 2;
    static readonly RULE_method_specific_id = 3;
    static readonly RULE_path = 4;
    static readonly RULE_query = 5;
    static readonly RULE_frag = 6;
    static readonly RULE_search = 7;
    static readonly RULE_searchparameter = 8;
    static readonly RULE_string = 9;
    static readonly ruleNames: string[];
    private static readonly _LITERAL_NAMES;
    private static readonly _SYMBOLIC_NAMES;
    static readonly VOCABULARY: Vocabulary;
    get vocabulary(): Vocabulary;
    get grammarFileName(): string;
    get ruleNames(): string[];
    get serializedATN(): string;
    protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException;
    constructor(input: TokenStream);
    did_url(): Did_urlContext;
    did(): DidContext;
    method_name(): Method_nameContext;
    method_specific_id(): Method_specific_idContext;
    path(): PathContext;
    query(): QueryContext;
    frag(): FragContext;
    search(): SearchContext;
    searchparameter(): SearchparameterContext;
    string(): StringContext;
    static readonly _serializedATN: string;
    static __ATN: ATN;
    static get _ATN(): ATN;
}
export declare class Did_urlContext extends ParserRuleContext {
    did(): DidContext;
    EOF(): TerminalNode;
    path(): PathContext | undefined;
    query(): QueryContext | undefined;
    frag(): FragContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: DIDUrlAbnfListener): void;
    exitRule(listener: DIDUrlAbnfListener): void;
}
export declare class DidContext extends ParserRuleContext {
    SCHEMA(): TerminalNode;
    COLON(): TerminalNode[];
    COLON(i: number): TerminalNode;
    method_name(): Method_nameContext;
    method_specific_id(): Method_specific_idContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: DIDUrlAbnfListener): void;
    exitRule(listener: DIDUrlAbnfListener): void;
}
export declare class Method_nameContext extends ParserRuleContext {
    string(): StringContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: DIDUrlAbnfListener): void;
    exitRule(listener: DIDUrlAbnfListener): void;
}
export declare class Method_specific_idContext extends ParserRuleContext {
    string(): StringContext[];
    string(i: number): StringContext;
    COLON(): TerminalNode[];
    COLON(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: DIDUrlAbnfListener): void;
    exitRule(listener: DIDUrlAbnfListener): void;
}
export declare class PathContext extends ParserRuleContext {
    string(): StringContext[];
    string(i: number): StringContext;
    SLASH(): TerminalNode[];
    SLASH(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: DIDUrlAbnfListener): void;
    exitRule(listener: DIDUrlAbnfListener): void;
}
export declare class QueryContext extends ParserRuleContext {
    search(): SearchContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: DIDUrlAbnfListener): void;
    exitRule(listener: DIDUrlAbnfListener): void;
}
export declare class FragContext extends ParserRuleContext {
    string(): StringContext | undefined;
    DIGIT(): TerminalNode | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: DIDUrlAbnfListener): void;
    exitRule(listener: DIDUrlAbnfListener): void;
}
export declare class SearchContext extends ParserRuleContext {
    searchparameter(): SearchparameterContext[];
    searchparameter(i: number): SearchparameterContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: DIDUrlAbnfListener): void;
    exitRule(listener: DIDUrlAbnfListener): void;
}
export declare class SearchparameterContext extends ParserRuleContext {
    string(): StringContext[];
    string(i: number): StringContext;
    DIGIT(): TerminalNode | undefined;
    HEX(): TerminalNode | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: DIDUrlAbnfListener): void;
    exitRule(listener: DIDUrlAbnfListener): void;
}
export declare class StringContext extends ParserRuleContext {
    STRING(): TerminalNode | undefined;
    DIGIT(): TerminalNode | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: DIDUrlAbnfListener): void;
    exitRule(listener: DIDUrlAbnfListener): void;
}
