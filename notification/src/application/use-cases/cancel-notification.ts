import { Injectable } from "@nestjs/common";
import { NotificationsRepository } from "@application/repositories/notifications-repository";
import { NotificaionNotFound } from "./errors/notificaion-not-found";

interface CancelNotificationRequest {
    notificaionId: string;
}

type CancelNotificationReponse = void;

@Injectable()
export class CancelNotification {
    constructor(
        private notificationsRepository: NotificationsRepository
    ) {}

    async execute(request: CancelNotificationRequest): Promise<CancelNotificationReponse>{
        const { notificaionId } = request;

        const notificaion = await this.notificationsRepository.findById(notificaionId);

        if (!notificaion) {
            throw new NotificaionNotFound();
        }

        notificaion.cancel();

        await this.notificationsRepository.save(notificaion);
    }   
}