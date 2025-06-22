import { randomUUID } from "crypto";
import { photoSchema } from "../../../infra/schemas/photoSchema";
import { ServerError } from "../../../infra/utils/serverError";
import { IEventRepository } from "../../../domain/repositorys/IEventRepository";

export class EventCreatePhotoUseCase {
    constructor(
        private eventRepository: IEventRepository
    ){}

    async execute(photoURLs: string, eventId: string){
        const parsedData = photoSchema.safeParse({ photoURLs });
        if (!parsedData) throw new ServerError("Bad request");

        const isEventExist = await this.eventRepository.getEventById(eventId);
        if (!isEventExist) throw new ServerError("Event not found", 404);

        const id = randomUUID();
        const photo = parsedData.data?.photoURLs!

        const photoURL = await this.eventRepository.createPhoto(id, photo, eventId)
        return photoURL;
    }
}