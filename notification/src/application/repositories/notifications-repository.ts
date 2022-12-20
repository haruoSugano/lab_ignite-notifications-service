import { Notification } from "../entities/notification/notification";

export abstract class NotificationsRepository {
    abstract create(notification: Notification): Promise<void>;
    abstract findById(notificaionId: string): Promise<Notification | null>;
    abstract save(notificaion: Notification): Promise<void>;
    abstract countManyByRecipientId(recipientId: string): Promise<number>;
    abstract findManyByRecipientId(recipientId: string): Promise<Notification[]>;
}