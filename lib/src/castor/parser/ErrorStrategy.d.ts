import { Parser, RecognitionException, Token } from "antlr4ts";
import { DefaultErrorStrategy } from "antlr4ts/DefaultErrorStrategy";
export declare class ErrorStrategy extends DefaultErrorStrategy {
    recover(recognizer: Parser, e: RecognitionException): void;
    recoverInline(recognizer: Parser): Token;
}
