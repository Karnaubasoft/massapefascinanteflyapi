import { FastifyRequest } from "fastify";
import { IAdminRepository } from "../../domain/repositorys/IAdminRepository";
import { adminDTO } from "../../infra/dto/adminDTO";
import { adminSchema } from "../../infra/schemas/adminSchema";
import { ServerError } from "../../infra/utils/serverError";
import { updateDefineFields } from "../../infra/utils/updateDefinedFields";
import bcrypt from "bcryptjs";

export class AdminUpdateUseCase {
    constructor(
        private readonly adminRepositoy: IAdminRepository
    ){}

    async execute(data: adminDTO, req: FastifyRequest){
        const user = req.user;
        if (!user) throw new ServerError("Unauthorized", 401);

        const parsedData = adminSchema.partial().safeParse(data);
        if (!parsedData.success) throw new ServerError("Bad Request");

        const { email, password } = parsedData.data!;

        const isAdminExist = await this.adminRepositoy.getAdminById(user.id);
        if (!isAdminExist) throw new ServerError("Admin not found", 404);

        if (email !== isAdminExist.email){
            const isEmailExist = await this.adminRepositoy.getAdminByEmail(email ?? '');
            if (isEmailExist) throw new ServerError("This email is alredy in use", 409);
        }

        updateDefineFields(isAdminExist, parsedData.data);
        if (password) isAdminExist.password = await bcrypt.hash(password, 10);

        await this.adminRepositoy.updateAdmin(isAdminExist);
        return isAdminExist;
    }
}