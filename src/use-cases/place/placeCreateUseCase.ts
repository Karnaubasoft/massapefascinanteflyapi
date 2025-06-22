import { randomUUID } from "crypto";
import { Place } from "../../domain/entities/places";
import { ICityRepository } from "../../domain/repositorys/ICityRepository";
import { IPlaceRepository } from "../../domain/repositorys/IPlaceRepository";
import { placeDTO } from "../../infra/dto/placeDTO";
import { placeSchema } from "../../infra/schemas/placeSchema";
import { ServerError } from "../../infra/utils/serverError";
import { FastifyRequest } from "fastify";
import { IAdminRepository } from "../../domain/repositorys/IAdminRepository";

export class PlaceCreateUseCase {
    constructor(
        private placeRepository: IPlaceRepository,
        private cityRepository: ICityRepository,
        private adminRepository: IAdminRepository
    ){}

    async execute(data: placeDTO, req: FastifyRequest){
        const parsedData = placeSchema.safeParse(data);
        console.log(parsedData.error)
        if (!parsedData.success) throw new ServerError("Bad Request");
        

        const { name, location, description, photoURLs, category, phone, instagram, latitude, longitude } = parsedData.data!

        const adminId = req.user?.id
        if (!adminId) throw new ServerError("Admin not authorized", 401);

        const isAdminExist = await this.adminRepository.getAdminById(adminId)
        if (!isAdminExist?.cityId) throw new ServerError("Admin not found")
        
        const isCityExist = await this.cityRepository.findUnique(isAdminExist.cityId);
        if (!isCityExist) throw new ServerError("City not found", 404);

        const id = randomUUID();
        const photos = photoURLs.map(url => ({
            id: randomUUID(),
            url
        }));

        const place = new Place(name, location, description, category, isAdminExist.cityId, id, phone ?? null, instagram ?? null, latitude, longitude, photos);

        await this.placeRepository.createPlace(place);
        return place
    }
}
