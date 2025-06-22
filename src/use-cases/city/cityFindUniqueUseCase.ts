import { FastifyRequest } from "fastify";
import { ICityRepository } from "../../domain/repositorys/ICityRepository";
import { ServerError } from "../../infra/utils/serverError";
import { IAdminRepository } from "../../domain/repositorys/IAdminRepository";

export class CityFindUniqueUseCase {
    constructor(
        private readonly cityRepository: ICityRepository,
        private readonly adminRepository: IAdminRepository
    ){}

    async execute(req: FastifyRequest) {
        const adminId = req.user?.id;
        if (!adminId) throw new ServerError("Unauthorized", 401);

        const isAdminExist = await this.adminRepository.getAdminById(adminId);
        if (!isAdminExist?.cityId) throw new ServerError("this city not exist");

        const city = await this.cityRepository.findUnique(isAdminExist.cityId);
        if (!city) throw new ServerError("City not found", 404);
        return city;
    }
}