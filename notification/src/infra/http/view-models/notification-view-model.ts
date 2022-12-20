import { Notification } from "@application/entities/notification/notification";

export class NotificaionViewModel {
    static toHTTP(notification: Notification) {
        return {
            id: notification.id,
            content: notification.content.value,
            category: notification.category,
            recipientId: notification.recipientId
        }
    }
}