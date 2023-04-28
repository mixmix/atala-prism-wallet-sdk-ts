import {AttachmentDescriptor, Message, Mercury, AttachmentBase64, AttachmentJsonData} from "domain/index.js";
import { AgentError } from "domain/models/Errors.js";
import { ProtocolType } from "../ProtocolTypes.js";
import { PickupAttachment } from "../types.js";

type PickupResponse =
  | { type: "status"; message: Message }
  | { type: "delivery"; message: Message };

export class PickupRunner {
  private message: PickupResponse;
  private mercury: Mercury;

  constructor(message: Message, mercury: Mercury) {
    switch (message.piuri) {
      case ProtocolType.PickupStatus:
        this.message = { type: "status", message: message };
        break;
      case ProtocolType.PickupDelivery:
        this.message = { type: "delivery", message: message };
        break;
      default:
        throw new AgentError.InvalidPickupDeliveryMessageError();
    }
    this.mercury = mercury;
  }

  private processAttachment(
    attachment: AttachmentDescriptor
  ): PickupAttachment | null {
    if (Message.isBase64Attachment(attachment.data)) {
      let attachmentBase64 = attachment.data as AttachmentBase64
      return {
        attachmentId: attachment.id,
        data: attachmentBase64.base64,
      };
    } else if (Message.isJsonAttachment(attachment.data)) {
      let attachmentJson = attachment.data as AttachmentJsonData
      return {
        attachmentId: attachment.id,
        data: attachmentJson.data
      };
    }

    return null;
  }

  private filterNullAttachments(
    attachment: PickupAttachment | null
  ): attachment is PickupAttachment {
    return attachment !== null;
  }

  async run(): Promise<Array<{ attachmentId: string; message: Message }>> {
    if (this.message.type === "delivery") {
      return Promise.all(
        this.message.message.attachments
          .map(this.processAttachment)
          .filter(this.filterNullAttachments)
          .map(async (attachment) => ({
            attachmentId: attachment.attachmentId,
            message: await this.mercury.unpackMessage(
              JSON.stringify(attachment.data)
            ),
          }))
      );
    }

    return [];
  }
}
