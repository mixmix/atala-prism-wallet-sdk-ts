import { DID } from "domain/index.js";
import { DIDAbnfLexer } from "castor/parser/DIDAbnfLexer.js";
import { CharStreams, CommonTokenStream } from "antlr4ts";
import {
  DIDAbnfParser,
  DidContext,
  Method_nameContext,
  Method_specific_idContext,
} from "./DIDAbnfParser.js";
import { DIDAbnfListener } from "castor/parser/DIDAbnfListener.js";
import { ParseTreeListener, ParseTreeWalker } from "antlr4ts/tree/index.js";
import { InvalidDIDString } from "domain/models/errors/Castor.js";
import { ErrorStrategy } from "castor/parser/ErrorStrategy.js";

class DIDListener implements DIDAbnfListener {
  public scheme?: string;
  public methodName?: string;
  public methodId?: string;

  exitMethod_specific_id(ctx: Method_specific_idContext) {
    this.methodId = ctx.text;
  }
  exitMethod_name(ctx: Method_nameContext) {
    this.methodName = ctx.text;
  }
  exitDid(ctx: DidContext) {
    this.scheme = ctx.SCHEMA()?.text;
  }
}

export function parse(didString: string): DID {
  const lexer = new DIDAbnfLexer(CharStreams.fromString(didString));
  const tokenStream = new CommonTokenStream(lexer);
  const parser = new DIDAbnfParser(tokenStream);
  const listener = new DIDListener();

  parser.errorHandler = new ErrorStrategy();

  const context = parser.did();

  ParseTreeWalker.DEFAULT.walk(listener as ParseTreeListener, context);
  if (!listener.scheme) {
    throw new InvalidDIDString("Invalid DID string, missing scheme");
  }
  if (!listener.methodName) {
    throw new InvalidDIDString("Invalid DID string, missing method name");
  }
  if (!listener.methodId) {
    throw new InvalidDIDString("Invalid DID string, missing method ID");
  }

  return new DID(listener.scheme, listener.methodName, listener.methodId);
}
