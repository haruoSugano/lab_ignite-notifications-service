import { Injectable } from "@nestjs/common";
import { NotificationsRepository } from "@application/repositories/notifications-repository";
import { NotificaionNotFound } from "./errors/notificaion-not-found";

interface ReadNotificationRequest {
    notificaionId: string;
}

type ReadNotificationReponse = void;

@Injectable()
export class ReadNotification {
    constructor(
        private notificationsRepository: NotificationsRepository
    ) {}

    async execute(request: ReadNotificationRequest): Promise<ReadNotificationReponse>{
        const { notificaionId } = request;

        const notificaion = await this.notificationsRepository.findById(notificaionId);

        if (!notificaion) {
            throw new NotificaionNotFound();
        }

        notificaion.read();

        await this.notificationsRepository.save(notificaion);
    }   
}