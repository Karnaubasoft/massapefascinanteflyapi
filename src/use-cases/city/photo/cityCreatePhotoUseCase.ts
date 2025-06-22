import { randomUUID } from "crypto";
import { ICityRepository } from "../../../domain/repositorys/ICityRepository";
import { photoSchema } from "../../../infra/schemas/photoSchema";
import { ServerError } from "../../../infra/utils/serverError";
import { FastifyRequest } from "fastify";
import { IAdminRepository } from "../../../domain/repositorys/IAdminRepository";

export class CityCreatePhotoUseCase {
    constructor(
        private cityRepository: ICityRepository,
        private readonly adminRepository: IAdminRepository
    ){}

    async execute(photoURLs: string, req: FastifyRequest){
        const parsedData = photoSchema.safeParse({ photoURLs });
        if (!parsedData) throw new ServerError("Bad request");

        const adminId = req.user?.id;
        if (!adminId) throw new ServerError("Unauthorized", 401);

        const isAdminExist = await this.adminRepository.getAdminById(adminId);
        if (!isAdminExist?.cityId) throw new ServerError("Admin not found", 404)

        const isCityExist = await this.cityRepository.findUnique(isAdminExist.cityId);
        if (!isCityExist) throw new ServerError("City not found", 404);

        const id = randomUUID();
        const photo = parsedData.data?.photoURLs!

        const photoURL = await this.cityRepository.createPhoto(id, photo, isCityExist.id)
        return photoURL;
    }
}