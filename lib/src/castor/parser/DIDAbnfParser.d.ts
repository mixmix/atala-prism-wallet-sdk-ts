import { ATN } from "antlr4ts/atn/ATN";
import { FailedPredicateException } from "antlr4ts/FailedPredicateException";
import { Parser } from "antlr4ts/Parser";
import { ParserRuleContext } from "antlr4ts/ParserRuleContext";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { TokenStream } from "antlr4ts/TokenStream";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { DIDAbnfListener } from "./DIDAbnfListener";
export declare class DIDAbnfParser extends Parser {
    static readonly SCHEMA = 1;
    static readonly ALPHA = 2;
    static readonly DIGIT = 3;
    static readonly PCT_ENCODED = 4;
    static readonly PERCENT = 5;
    static readonly DASH = 6;
    static readonly PERIOD = 7;
    static readonly COLON = 8;
    static readonly UNDERSCORE = 9;
    static readonly RULE_did = 0;
    static readonly RULE_method_name = 1;
    static readonly RULE_method_specific_id = 2;
    static readonly RULE_idchar = 3;
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
    did(): DidContext;
    method_name(): Method_nameContext;
    method_specific_id(): Method_specific_idContext;
    idchar(): IdcharContext;
    static readonly _serializedATN: string;
    static __ATN: ATN;
    static get _ATN(): ATN;
}
export declare class DidContext extends ParserRuleContext {
    SCHEMA(): TerminalNode;
    COLON(): TerminalNode[];
    COLON(i: number): TerminalNode;
    method_name(): Method_nameContext;
    method_specific_id(): Method_specific_idContext;
    EOF(): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: DIDAbnfListener): void;
    exitRule(listener: DIDAbnfListener): void;
}
export declare class Method_nameContext extends ParserRuleContext {
    ALPHA(): TerminalNode[];
    ALPHA(i: number): TerminalNode;
    DIGIT(): TerminalNode[];
    DIGIT(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: DIDAbnfListener): void;
    exitRule(listener: DIDAbnfListener): void;
}
export declare class Method_specific_idContext extends ParserRuleContext {
    idchar(): IdcharContext[];
    idchar(i: number): IdcharContext;
    COLON(): TerminalNode | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: DIDAbnfListener): void;
    exitRule(listener: DIDAbnfListener): void;
}
export declare class IdcharContext extends ParserRuleContext {
    ALPHA(): TerminalNode | undefined;
    DIGIT(): TerminalNode | undefined;
    PERIOD(): TerminalNode | undefined;
    DASH(): TerminalNode | undefined;
    UNDERSCORE(): TerminalNode | undefined;
    PCT_ENCODED(): TerminalNode | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: DIDAbnfListener): void;
    exitRule(listener: DIDAbnfListener): void;
}
