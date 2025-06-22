import { FastifyRequest } from "fastify";
import { ICityRepository } from "../../domain/repositorys/ICityRepository";
import { cityDTO } from "../../infra/dto/cityDTO";
import { citySchema } from "../../infra/schemas/citySchema";
import { ServerError } from "../../infra/utils/serverError";
import { updateDefineFields } from "../../infra/utils/updateDefinedFields";
import { IAdminRepository } from "../../domain/repositorys/IAdminRepository";

export class CityUpdateUseCase {
    constructor(
        private readonly cityRepository: ICityRepository,
        private readonly adminRepository: IAdminRepository
    ){}

    async execute(data: cityDTO, req: FastifyRequest){
        const parsedData = citySchema.partial().safeParse(data);
        if (!parsedData.success) throw new ServerError("Bad Request");

        const adminId = req.user?.id;
        if (!adminId) throw new ServerError("Unauthorized", 404);

        const isAdminExist = await this.adminRepository.getAdminById(adminId);
        if (!isAdminExist?.cityId) throw new ServerError("This city not exist");

        const isCityExist = await this.cityRepository.findUnique(isAdminExist.cityId);
        if (!isCityExist) throw new ServerError("City not found", 404);

        updateDefineFields(isCityExist, parsedData.data);
        await this.cityRepository.updateCity(isCityExist);

        return isCityExist;
    }
}