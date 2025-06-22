import { FastifyRequest } from "fastify";
import { ICityRepository } from "../../domain/repositorys/ICityRepository";
import { ServerError } from "../../infra/utils/serverError";
import { IAdminRepository } from "../../domain/repositorys/IAdminRepository";

export class CityDeleteUseCase {
    constructor(
        private readonly cityRepository: ICityRepository,
        private readonly adminRepository: IAdminRepository
    ){}

    async execute(req: FastifyRequest){
        const adminId = req.user?.id;
        if (!adminId) throw new ServerError("Unauthorized", 401);

        const isAdminExist = await this.adminRepository.getAdminById(adminId);
        if (!isAdminExist) throw new ServerError("Admin not found", 404);

        const { cityId } = isAdminExist;
        if (!cityId) throw new ServerError("City not exist", 404);

        const isCityExist = await this.cityRepository.findUnique(cityId);
        if (!isCityExist) throw new ServerError("City not found", 404);
        
        const isCityExistEvents = await this.cityRepository.existsEventInCity(cityId);
        if (isCityExistEvents) throw new ServerError("This city has events, you can't delete it", 409);

        const isCityExistPlaces = await this.cityRepository.existsPlaceInCity(cityId);
        if (isCityExistPlaces) throw new ServerError("This city has places, you can't delete it", 409);

        await this.cityRepository.deleteCity(cityId);
    }
}