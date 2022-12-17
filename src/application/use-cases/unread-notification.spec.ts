import { makeNotification } from "@test/factories/notification-factory";
import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository";
import { NotificaionNotFound } from "./errors/notificaion-not-found";
import { UnreadNotification } from "./unread-notification";


describe("Unread notification", () => {
    it("should be able to Unread a notification", async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        const unreadNotification = new UnreadNotification(notificationsRepository);

        const notificaion = makeNotification({ 
            readAt: new Date()
        });

        await notificationsRepository.create(notificaion);

        await unreadNotification.execute({
            notificaionId: notificaion.id as string
        });

        expect(notificationsRepository.notifications[0].readAt).toBeNull();
    });

    it("should not be able to read a non existing notification", async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        const unreadNotification = new UnreadNotification(notificationsRepository);

        expect(() => {
            return unreadNotification.execute({
                notificaionId: "fake-notification-id"
            });
        }).rejects.toThrow(NotificaionNotFound);
    })
});