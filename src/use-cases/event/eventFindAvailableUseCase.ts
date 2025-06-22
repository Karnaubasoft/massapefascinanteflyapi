import { IEventRepository } from "../../domain/repositorys/IEventRepository";
import { ServerError } from "../../infra/utils/serverError";

export class EventFindAvailableUseCase {
    constructor(private eventRepository: IEventRepository){}

    async execute(){
        const events = await this.eventRepository.findAvailableEvents();
        const eventsLength = events.length > 0;
        
        if (!events) throw new ServerError("No avaliable events found", 404);
        if (!eventsLength) throw new ServerError("No avaliable events found", 404);
        
        return events;
    }
}