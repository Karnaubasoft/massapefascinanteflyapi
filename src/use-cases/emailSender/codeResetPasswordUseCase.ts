import { codeResetDTO } from "../../infra/dto/emailSenderDTO";
import { TokenForChangePassword } from "../../infra/interfaces/iTokenChangePasswordRepository";
import { codeResetSchema } from "../../infra/schemas/emailSenderSchema";
import { ServerError } from "../../infra/utils/serverError";

export class CodeResetPassword {
    constructor(
        private changePassword: TokenForChangePassword
    ){}

    async execute(data: codeResetDTO): Promise<string> {
        const parsedData = codeResetSchema.safeParse(data);
        if (!parsedData.success) throw new ServerError("Bad request");

        const { email, code } = parsedData.data;

        const emailExists = await this.changePassword.checkEmailHasCode(email);
        if (!emailExists) throw new ServerError("Email not found", 404);

        const isValid = await this.changePassword.verifyCode(email, code);
        if (!isValid) throw new ServerError("Invalid code verification", 401);

        const token = await this.changePassword.generateToken();
        await this.changePassword.createResetToken(token, email);

        await this.changePassword.validateResetLinkToken(token);
        await this.changePassword.allowReset(email);

        return token;
    }
}