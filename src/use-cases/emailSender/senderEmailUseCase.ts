import { randomBytes } from "crypto";
import { emailSenderDTO } from "../../infra/dto/emailSenderDTO";
import { TokenForChangePassword } from "../../infra/interfaces/iTokenChangePasswordRepository";
import { emailSenderSchema } from "../../infra/schemas/emailSenderSchema";
import { ServerError } from "../../infra/utils/serverError";
import { IAdminRepository } from "../../domain/repositorys/IAdminRepository";

export class SenderEmailUseCase {
    constructor(
        private adminRepository: IAdminRepository,
        private changePassword: TokenForChangePassword
    ){}

    async execute(data: emailSenderDTO){
        const parsedData = emailSenderSchema.safeParse(data);
        if (!parsedData.success) throw new ServerError("Bad request");

        const { ip, email } = parsedData.data;
        const code = randomBytes(4).toString('hex').toUpperCase()

        const isAdminExist = await this.adminRepository.getAdminByEmail(email);
        if (!isAdminExist) throw new ServerError("Admin not found", 404);

        await this.changePassword.sendPasswordRecoveryEmail(code, email)
        await this.changePassword.storeVerificationCode(email, code);
    }
}