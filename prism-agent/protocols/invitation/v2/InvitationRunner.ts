import { Mercury, Message } from "domain/index.js";
import { OutOfBandParser } from "./OutOfBandParser.js";

export class InvitationRunner {
  constructor(private mercury: Mercury, private url: URL) {}

  async run(): Promise<Message> {
    const messageData = OutOfBandParser.parseMessage(this.url);
    return this.mercury.unpackMessage(messageData);
  }
}
