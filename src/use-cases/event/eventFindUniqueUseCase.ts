import { ICityRepository } from "../../domain/repositorys/ICityRepository";
import { IEventRepository } from "../../domain/repositorys/IEventRepository";
import { ServerError } from "../../infra/utils/serverError";

export class EventFindUniqueUseCase {
    constructor(
        private eventRepository: IEventRepository,
        private cityRepository: ICityRepository
    ){}

    async execute(id: string){
        const isEventExist = await this.eventRepository.getEventById(id);
        if (!isEventExist) throw new ServerError("Event not found", 404);

        const isCityExist = await this.cityRepository.findUnique(isEventExist.cityId);
        if (!isCityExist) throw new ServerError("City not found", 404);
        
        return isEventExist;
    }
}