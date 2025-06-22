import { randomUUID } from "crypto";
import { ICityRepository } from "../../domain/repositorys/ICityRepository";
import { IEventRepository } from "../../domain/repositorys/IEventRepository";
import { eventDTO } from "../../infra/dto/eventSchemaDTO";
import { eventSchema } from "../../infra/schemas/eventSchema";
import { ServerError } from "../../infra/utils/serverError";
import { Events } from "../../domain/entities/event";
import { FastifyRequest } from "fastify";
import { IAdminRepository } from "../../domain/repositorys/IAdminRepository";

export class EventCreateUseCase {
    constructor(
        private eventRepository: IEventRepository,
        private cityRepository: ICityRepository, 
        private adminRepository: IAdminRepository
    ){}

    async execute(data: eventDTO, req: FastifyRequest){
        const parsedData = eventSchema.safeParse(data);
        if (!parsedData.data) throw new ServerError("Bad request");

        const {name, date, lastDate, location, active, description, photoURLs, instagram} = parsedData.data

        const adminId = req.user?.id
        if (!adminId) throw new ServerError("Admin not authorized", 401);

        const isAdminExist = await this.adminRepository.getAdminById(adminId)
        if (!isAdminExist) throw new ServerError("Admin not found")
        
        const { cityId } = isAdminExist;
        if (!cityId) throw new ServerError(`City not found ${cityId}`);

        const isCityExist = await this.cityRepository.findUnique(cityId);
        if (!isCityExist) throw new ServerError("City not found", 404);

        const dataIsBigLastData = date > lastDate;
        if (dataIsBigLastData) throw new ServerError("LastData cannot be greater than the start date");
        
        const id = randomUUID();
        const photo = photoURLs.map(url => ({
            id: randomUUID(),
            url
        }));

        const event = new Events(name, date, lastDate, active, description, id, cityId, location,  instagram, photo);
        await this.eventRepository.createEvent(event);

        return {event};
    }
}