import { makeNotification } from "@test/factories/notification-factory";
import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository";
import { CancelNotification } from "./cancel-notification";
import { NotificaionNotFound } from "./errors/notificaion-not-found";

describe("Cancel notification", () => {
    it("should be able to Cancel a notification", async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        const cancelNotification = new CancelNotification(notificationsRepository);

        const notificaion = makeNotification();

        await notificationsRepository.create(notificaion);

        await cancelNotification.execute({
            notificaionId: notificaion.id as string
        });

        expect(notificationsRepository.notifications[0].canceledAt).toEqual(
            expect.any(Date)
        );
    });

    it("should not be able to cancel a non existing notification", async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        const cancelNotification = new CancelNotification(notificationsRepository);

        expect(() => {
            return cancelNotification.execute({
                notificaionId: "fake-notification-id"
            });
        }).rejects.toThrow(NotificaionNotFound);
    })
});