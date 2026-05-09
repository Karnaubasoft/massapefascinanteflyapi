import { FastifyRequest } from "fastify";
import { IAdminRepository } from "../../domain/repositorys/IAdminRepository";
import { ServerError } from "../../infra/utils/serverError";

export class AdminFindUniqueUseCase {
    constructor(private readonly adminRepository: IAdminRepository){}

    async execute(req: FastifyRequest){
        const user = req.user;
        if (!user) throw new ServerError("Unauthorized", 401);

        const isAdminExist = await this.adminRepository.getAdminById(user.id);
        if (!isAdminExist) throw new ServerError("Admin not found", 404);

        const { password, ...rest } = isAdminExist
        return rest
    }
}
