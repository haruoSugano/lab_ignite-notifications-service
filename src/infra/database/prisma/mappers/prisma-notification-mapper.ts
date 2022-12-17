import { Notification as RawNotificaion } from "@prisma/client";
import { Notification } from "@application/entities/notification/notification";
import { Content } from "@application/entities/notification/content";

export class PrismaNotificationMapper {
    static toPrisma(notification: Notification) {
        return {
            id: notification.id,
            category: notification.category,
            content: notification.content.value,
            recipientId: notification.recipientId,
            readAt: notification.readAt,
            createdAt: notification.createdAt
        };
    }

    static toDomain(raw: RawNotificaion): Notification {
        return new Notification({
            category: raw.category,
            content: new Content(raw.content),
            recipientId: raw.recipientId,
            readAt: raw.readAt,
            canceledAt: raw.canceledAt,
            createdAt: raw.createdAt
        },raw.id);
    }
}