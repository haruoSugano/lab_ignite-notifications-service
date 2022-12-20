import { Injectable } from "@nestjs/common";
import { NotificationsRepository } from "@application/repositories/notifications-repository";
import { Notification } from "@application/entities/notification/notification";

interface GetRecipientNotificationsRequest {
    recipientId: string;
}

interface GetRecipientNotificationsReponse {
    notifications: Notification[];
}

@Injectable()
export class GetRecipientNotifications {
    constructor(
        private notificationsRepository: NotificationsRepository
    ) { }

    async execute(request: GetRecipientNotificationsRequest): Promise<GetRecipientNotificationsReponse> {
        const { recipientId } = request;
        
        const notifications = await this.notificationsRepository.findManyByRecipientId(recipientId);

        return { notifications };
    }
}