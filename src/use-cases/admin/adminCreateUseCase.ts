import { randomUUID } from "crypto";
import { IAdminRepository } from "../../domain/repositorys/IAdminRepository";
import { adminDTO } from "../../infra/dto/adminDTO";
import { adminSchema } from "../../infra/schemas/adminSchema";
import { ServerError } from "../../infra/utils/serverError";
import bcrypt from "bcryptjs";
import { Admin } from "../../domain/entities/admin";

export class AdminCreateUseCase {
    constructor(
        private readonly adminRepository: IAdminRepository
    ){}

    async execute(data: adminDTO){
        const parsedData = adminSchema.safeParse(data);
        if(!parsedData.success) throw new ServerError("Bad Request");

        const { name, email, password } = parsedData.data;

        const isAdminExist = await this.adminRepository.getAdminByEmail(email);
        if (isAdminExist) throw new ServerError("Admin already exists", 409);

        const id = randomUUID();
        const hashedPassword = await bcrypt.hash(password, 10);

        const admin = new Admin(id, name, email, hashedPassword, null, null);
        await this.adminRepository.createAdmin(admin);

        return {name, email};    
    }
}