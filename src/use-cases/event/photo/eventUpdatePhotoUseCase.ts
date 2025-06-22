import { IEventRepository } from "../../../domain/repositorys/IEventRepository";
import { photoSchema } from "../../../infra/schemas/photoSchema";
import { ServerError } from "../../../infra/utils/serverError";
export class EventUpdatePhotoUseCase {
    constructor(
        private eventRepository: IEventRepository
    ) { }

    async execute(id: string, photoURLs: string) {
        const parsedData = photoSchema.safeParse({ photoURLs });
        if (!parsedData.success) throw new ServerError("Bad request");

        const isPhotoExist = await this.eventRepository.findPhoto(id);
        if (!isPhotoExist) throw new ServerError("Photo not found", 404);

        const updatedPhoto = await this.eventRepository.updatePhoto(id, photoURLs);
        return updatedPhoto;
    }

}