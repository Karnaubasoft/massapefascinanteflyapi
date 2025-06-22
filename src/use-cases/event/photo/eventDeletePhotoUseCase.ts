import { IEventRepository } from "../../../domain/repositorys/IEventRepository";
import { ServerError } from "../../../infra/utils/serverError";

export class EventDeletePhotoUseCase {
    constructor(private readonly eventRepository: IEventRepository){}

    async execute(id: string){
        const isPhotoExist = await this.eventRepository.findPhoto(id);
        if (!isPhotoExist) throw new ServerError("event not found", 404);

        await this.eventRepository.deletePhoto(id);
    }
}