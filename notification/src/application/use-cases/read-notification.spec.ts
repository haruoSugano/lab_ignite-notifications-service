import { makeNotification } from "@test/factories/notification-factory";
import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository";
import { NotificaionNotFound } from "./errors/notificaion-not-found";
import { ReadNotification } from "./read-notification";

describe("Read notification", () => {
    it("should be able to Read a notification", async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        const readNotification = new ReadNotification(notificationsRepository);

        const notificaion = makeNotification();

        await notificationsRepository.create(notificaion);

        await readNotification.execute({
            notificaionId: notificaion.id as string
        });

        expect(notificationsRepository.notifications[0].readAt).toEqual(
            expect.any(Date)
        );
    });

    it("should not be able to read a non existing notification", async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        const readNotification = new ReadNotification(notificationsRepository);

        expect(() => {
            return readNotification.execute({
                notificaionId: "fake-notification-id"
            });
        }).rejects.toThrow(NotificaionNotFound);
    })
});