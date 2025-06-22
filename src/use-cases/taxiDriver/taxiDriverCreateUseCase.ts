import { randomUUID } from "crypto";
import { ICityRepository } from "../../domain/repositorys/ICityRepository";
import { ITaxiDriverRepository } from "../../domain/repositorys/ITaxiDriverRepository";
import { taxiDriverDTO } from "../../infra/dto/taxiDriverDTO";
import { taxiDriverSchema } from "../../infra/schemas/taxiDriverSchema";
import { ServerError } from "../../infra/utils/serverError";
import { TaxiDriver } from "../../domain/entities/taxiDriver";
import { FastifyRequest } from "fastify";
import { IAdminRepository } from "../../domain/repositorys/IAdminRepository";

export class TaxiDriverCreateUseCase {
    constructor(
        private readonly taxiDriverRepository: ITaxiDriverRepository,
        private readonly adminRepository: IAdminRepository,
        private readonly cityRepository: ICityRepository,
    ){}

    async execute(data: taxiDriverDTO, req: FastifyRequest) {
        const admin = req.user;
        if (!admin) throw new ServerError("Unauthorized", 401);

        const isAdminExist = await this.adminRepository.getAdminById(admin.id);
        if (!isAdminExist?.cityId) throw new ServerError("Admin does not have a city", 404);

        const parsedData = taxiDriverSchema.safeParse(data);
        if (!parsedData.success) throw new ServerError("Bad Request");

        const { name, photoURLs, phone, workingDescription } = parsedData.data;

        const isCityExist = await this.cityRepository.findUnique(isAdminExist.cityId);
        if (!isCityExist) throw new ServerError("City not found", 404);

        const id = randomUUID();
        const taxiDriver = new TaxiDriver(id, name, photoURLs, phone, workingDescription, isCityExist.id);

        await this.taxiDriverRepository.createTaxiDriver(taxiDriver);
        return taxiDriver; 
    }
}