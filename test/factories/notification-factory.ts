import { Content } from "@application/entities/notification/content"
import { Notification, NotificaionProps } from "@application/entities/notification/notification"

type Override = Partial<NotificaionProps>;

export function makeNotification(override: Override = {}) {
    return new Notification({
        category: "social",
        content: new Content("Nova solicitação de amizade"),
        recipientId: "recipient-02",
        ...override,
    });
}