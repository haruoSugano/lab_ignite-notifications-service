import { Injectable } from "@nestjs/common";
import { NotificationsRepository } from "@application/repositories/notifications-repository";
import { NotificaionNotFound } from "./errors/notificaion-not-found";

interface UnreadNotificationRequest {
    notificaionId: string;
}

type UnreadNotificationReponse = void;

@Injectable()
export class UnreadNotification {
    constructor(
        private notificationsRepository: NotificationsRepository
    ) {}

    async execute(request: UnreadNotificationRequest): Promise<UnreadNotificationReponse>{
        const { notificaionId } = request;

        const notificaion = await this.notificationsRepository.findById(notificaionId);

        if (!notificaion) {
            throw new NotificaionNotFound();
        }

        notificaion.unread();

        await this.notificationsRepository.save(notificaion);
    }   
}