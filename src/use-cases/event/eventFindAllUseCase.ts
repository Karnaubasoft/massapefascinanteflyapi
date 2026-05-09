import { IEventRepository } from "../../domain/repositorys/IEventRepository";
export class EventFindAllUseCase {
    constructor(
        private eventRepository: IEventRepository,
    ){}

    async execute() {
        const events = await this.eventRepository.getAllEvents();
        return events ?? [];
    }
}
