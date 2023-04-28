import { uuid } from "@stablelib/uuid";

import { AttachmentDescriptor, DID, Message } from "domain/index.js";
import { AgentError } from "domain/models/Errors.js";
import { ProtocolHelpers } from "prism-agent/helpers/ProtocolHelpers.js";
import { ProtocolType } from "prism-agent/protocols/ProtocolTypes.js";
import { RequestPresentationBody } from "prism-agent/protocols/types.js";
import { ProposePresentation } from "prism-agent/protocols/proofPresentation/ProposePresentation.js";

export class RequestPresentation {
  public static type = ProtocolType.DidcommRequestPresentation;
  public body: RequestPresentationBody;

  constructor(
    body: RequestPresentationBody,
    public attachments: AttachmentDescriptor[],
    public from: DID,
    public to: DID,
    public thid?: string,
    public id: string = uuid()
  ) {
    this.body = {
      willConfirm: body.willConfirm !== undefined ? body.willConfirm : false,
      proofTypes: body.proofTypes,
      goalCode: body.goalCode,
      comment: body.comment,
    };
  }

  makeMessage(): Message {
    const body = JSON.stringify(this.body);
    return new Message(
      body,
      this.id,
      RequestPresentation.type,
      this.from,
      this.to,
      this.attachments,
      this.thid
    );
  }

  static fromMessage(fromMessage: Message): RequestPresentation {
    if (
      fromMessage.piuri !== ProtocolType.DidcommRequestPresentation ||
      !fromMessage.from ||
      !fromMessage.to
    ) {
      throw new AgentError.InvalidRequestPresentationMessageError();
    }
    const type = fromMessage.piuri as ProtocolType;
    const requestPresentationBody =
      ProtocolHelpers.safeParseBody<RequestPresentationBody>(
        fromMessage.body,
        type
      );

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const fromDID = fromMessage.from!;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const toDID = fromMessage.to!;

    return new RequestPresentation(
      requestPresentationBody,
      fromMessage.attachments,
      fromDID,
      toDID,
      fromMessage.thid,
      fromMessage.id
    );
  }

  static makeRequestFromProposal(message: Message): RequestPresentation {
    const request = ProposePresentation.fromMessage(message);

    const type = message.piuri as ProtocolType;
    const requestPresentationBody =
      ProtocolHelpers.safeParseBody<RequestPresentationBody>(
        message.body,
        type
      );

    return new RequestPresentation(
      requestPresentationBody,
      request.attachments,
      request.to,
      request.from,
      message.id
    );
  }
}
