import { makeNotification } from "@test/factories/notification-factory";
import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository";
import { GetRecipientNotifications } from "./get-recipient-notifications";


describe("Get recipients notification", () => {
    it("should be able to get recipient notifications", async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        const getRecipientNotifications = new GetRecipientNotifications(notificationsRepository);

        const notification01 = makeNotification({ recipientId: "recipient-01" });

        await notificationsRepository.create(notification01);

        await notificationsRepository.create(notification01);

        await notificationsRepository.create(makeNotification({ recipientId: "recipient-02" }));

        const { notifications } = await getRecipientNotifications.execute({
            recipientId: "recipient-01",
        });

        expect(notifications).toHaveLength(2);
        expect(notifications).toEqual(expect.arrayContaining([
            expect.objectContaining({ recipientId: "recipient-01" }),
            expect.objectContaining({ recipientId: "recipient-01" })
        ]));
    });
});