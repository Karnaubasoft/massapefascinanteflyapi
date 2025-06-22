import { FastifyRequest } from "fastify";
import { IAdminRepository } from "../../domain/repositorys/IAdminRepository";
import { ServerError } from "../../infra/utils/serverError";

export class AdminDeleteUseCase {
    constructor(
        private readonly adminRepository: IAdminRepository
    ){}

    async execute(req: FastifyRequest){
        const user = req.user;
        if (!user) throw new ServerError("Unauthorized");

        const isAdminExist = await this.adminRepository.getAdminById(user.id);
        if (!isAdminExist) throw new ServerError("Admin not found");

        if(isAdminExist.city) throw new ServerError("This admin alredy has a registered city");

        await this.adminRepository.deleteAdmin(user.id);
        return isAdminExist;
    }
}