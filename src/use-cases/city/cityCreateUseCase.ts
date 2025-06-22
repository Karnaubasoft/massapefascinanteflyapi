import { randomUUID } from "crypto";
import { ICityRepository } from "../../domain/repositorys/ICityRepository";
import { cityDTO } from "../../infra/dto/cityDTO";
import { citySchema } from "../../infra/schemas/citySchema";
import { City } from "../../domain/entities/city";
import { FastifyRequest } from "fastify";
import { IAdminRepository } from "../../domain/repositorys/IAdminRepository";
import { ServerError } from "../../infra/utils/serverError";

export class CityCreateUseCase {
    constructor(
        private readonly cityRepository: ICityRepository,
        private readonly adminRepository: IAdminRepository
    ) { }

    async execute(data: cityDTO, req: FastifyRequest) {
        const adminId = req.user?.id;
        if (!adminId) throw new ServerError("Unauthorized", 401);

        const parsedData = citySchema.safeParse(data);
        if (!parsedData.success) throw new ServerError("Bad Request");

        const isAdminExists = await this.adminRepository.getAdminById(adminId);
        if (!isAdminExists) throw new ServerError("Admin not found", 404);

        if (isAdminExists.city) throw new ServerError("Admin already has a city", 400);

        const { name, location, description, photoURLs, instagram } = parsedData.data!;
        const id = randomUUID();

        const photo = (photoURLs && Array.isArray(photoURLs) ? photoURLs : []).map(url => ({
            id: randomUUID(),
            url
        }));

        const city = new City(name, location, description, id, adminId, photo, [], [], instagram);
        await this.cityRepository.createCity(city);

        await this.cityRepository.updateCityId(adminId, id);
        return { city };
    }
}