import { Injectable } from "@nestjs/common";
import { NotificationsRepository } from "@application/repositories/notifications-repository";

interface CountRecipientNotificationsRequest {
    recipientId: string;
}

interface CountRecipientNotificationsReponse {
    count: number;
}

@Injectable()
export class CountRecipientNotifications {
    constructor(
        private notificationsRepository: NotificationsRepository
    ) { }

    async execute(request: CountRecipientNotificationsRequest): Promise<CountRecipientNotificationsReponse> {
        const { recipientId } = request;
        
        const count = await this.notificationsRepository.countManyByRecipientId(recipientId);
        return { count };
    }
}