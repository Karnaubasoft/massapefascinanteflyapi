import { IEventRepository } from "../../domain/repositorys/IEventRepository";
export class EventFindAvailableUseCase {
    constructor(private eventRepository: IEventRepository){}

    async execute(){
        const events = await this.eventRepository.findAvailableEvents();
        return events ?? [];
    }
}
