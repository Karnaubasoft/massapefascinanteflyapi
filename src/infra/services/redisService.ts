import { randomBytes } from "crypto";
import { TokenForChangePassword } from "../interfaces/iTokenChangePasswordRepository";
import { ServerError } from "../utils/serverError";
import { SenderEmailService } from "./senderEmailService";
import { redis } from "../../config/redis";

export class RedisService implements TokenForChangePassword {
    constructor(
        private senderEmail: SenderEmailService
    ) { }

    async generateToken(): Promise<string> {
        return randomBytes(32).toString('hex')
    }

    async createResetToken(token: string, email: string): Promise<string> {
        if (!email) throw new ServerError("Email invalid");
        await redis.setex(`password-key:${token}`, 3600, email);

        return token;
    }

    async validateResetLinkToken(token: string): Promise<boolean> {
        const isValidToken = await redis.get(`password-key:${token}`)
        if (!isValidToken) throw new ServerError("Token invalid", 403);
        return true
    }

    async invalidateResetLinkToken(token: string): Promise<void> {
        await redis.del(`password-key:${token}`)
    }

    async getEmailByToken(token: string): Promise<string | null> {
        return await redis.get(`password-key:${token}`)
    }

    async checkEmailHasCode(email: string): Promise<boolean> {
        const code = await redis.get(`reset-code:${email}`);
        return code !== null;
    }

    async sendPasswordRecoveryEmail(code: string, email: string): Promise<void> {
        await this.senderEmail.senderEmail({ code, email })
    }

    async storeVerificationCode(email: string, code: string): Promise<void> {
        await redis.setex(`reset-code:${email}`, 3600, code)
    }

    async verifyCode(email: string, code: string): Promise<boolean> {
        const storedCode = await redis.get(`reset-code:${email}`);
        return storedCode === code
    }

    async allowReset(email: string): Promise<void> {
        await redis.setex(`reset-allowed:${email}`, 3600, "true");
    }


    async isResetAllowed(email: string): Promise<boolean> {
        const flag = await redis.get(`reset-allowed:${email}`);
        return flag === "true";
    }
}