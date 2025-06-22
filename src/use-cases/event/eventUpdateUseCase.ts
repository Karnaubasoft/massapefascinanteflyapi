import { ICityRepository } from "../../domain/repositorys/ICityRepository";
import { IEventRepository } from "../../domain/repositorys/IEventRepository";
import { eventDTO } from "../../infra/dto/eventSchemaDTO";
import { eventSchema } from "../../infra/schemas/eventSchema";
import { ServerError } from "../../infra/utils/serverError";
import { updateDefineFields } from "../../infra/utils/updateDefinedFields";

export class EventUpdateUseCase {
    constructor(
        private eventRepository: IEventRepository,
        private cityRepository: ICityRepository
    ){}

    async execute(data: eventDTO, id: string){
        const parsedData = eventSchema.partial().safeParse(data);
        console.log(parsedData.error)
        if (!parsedData.success) throw new ServerError("Bad request", 404);

        const isEventExist = await this.eventRepository.getEventById(id);
        if (!isEventExist) throw new ServerError("Event not found", 404);

        const isCityExist = await this.cityRepository.findUnique(isEventExist.cityId);
        if (!isCityExist) throw new ServerError("City ot found", 404);

        updateDefineFields(isEventExist, parsedData.data);
        await this.eventRepository.updateEvent(isEventExist);

        return isEventExist;
    }
}