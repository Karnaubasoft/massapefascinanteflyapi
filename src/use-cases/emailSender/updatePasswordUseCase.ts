import { forgotPasswordDTO } from "../../infra/dto/emailSenderDTO";
import { TokenForChangePassword } from "../../infra/interfaces/iTokenChangePasswordRepository";
import { forgotPasswordSchema } from "../../infra/schemas/emailSenderSchema";
import { ServerError } from "../../infra/utils/serverError";
import { IAdminRepository } from "../../domain/repositorys/IAdminRepository";
import bcrypt from 'bcryptjs';

export class UpdatePasswordUseCase {
    constructor(
            private adminRepository: IAdminRepository,
            private changePassoword: TokenForChangePassword
    ){}

    async execute(data: forgotPasswordDTO){
        const parsedData = forgotPasswordSchema.safeParse(data);
        if (!parsedData.success) throw new ServerError("Bad request");

        const { password, token } = parsedData.data!;

        const email = await this.changePassoword.getEmailByToken(token);
        if (!email) throw new ServerError("Invalid email", 401);

        await this.changePassoword.allowReset(email);

        const isAllowed = await this.changePassoword.isResetAllowed(email);
        if (!isAllowed) throw new ServerError("Code not confirmed", 403);

        const admin = await this.adminRepository.getAdminByEmail(email);
        if (!admin) throw new ServerError("Admin not found", 404);

        const isValid = await this.changePassoword.validateResetLinkToken(token);
        if (!isValid) throw new ServerError("Invalid token or expired", 401);

        admin.password = await bcrypt.hash(password, 10);
        await this.adminRepository.updateAdmin(admin);

        await this.changePassoword.invalidateResetLinkToken(token);

        return { name: admin.name, email: admin.email };
    }
}