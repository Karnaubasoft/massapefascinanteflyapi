import { IAdminRepository } from "../../domain/repositorys/IAdminRepository";
import { adminLoginDTO } from "../../infra/dto/adminDTO";
import { adminLoginSchema } from "../../infra/schemas/adminSchema";
import bcrypt from "bcryptjs";
import { ServerError } from "../../infra/utils/serverError";
import jwt from "jsonwebtoken";
import { env } from "../../config/env";
import { userData } from "../../infra/types/userData";

export class AdminLoginUseCase {
    constructor(private readonly adminRepository: IAdminRepository ){}

    async execute(data: adminLoginDTO){
        const parsedData = adminLoginSchema.safeParse(data);
        if (!parsedData.success) throw new ServerError("Bad Request");

        const { email, password, remenberMe } = parsedData.data;

        const isAdminExist = await this.adminRepository.getAdminByEmail(email);
        if (!isAdminExist) throw new ServerError("invalid credentials");

        const adminAuthorized = await this.adminRepository.findAdminAuthorized(isAdminExist.id);
        if (!adminAuthorized) throw new ServerError("Admin is no authorized", 401)
        
        if (!isAdminExist.password) throw new ServerError("This account has been registered with Google");

        const isPassword = await bcrypt.compare(password, isAdminExist.password);
        if (!isPassword) throw new ServerError("invalid credentials");

        const payload: userData = {
            id: isAdminExist.id,
            cityId: isAdminExist.cityId || null,
            remenberMe: remenberMe
        }

        const token = jwt.sign(payload, env.JWT_SECRET, {
            expiresIn: remenberMe ? '30d': '1d'
        });

        return {token, remenberMe};
    }
}