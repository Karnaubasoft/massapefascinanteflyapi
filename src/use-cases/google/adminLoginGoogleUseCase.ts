import { OAuth2Client } from "google-auth-library";
import { env } from "../../config/env";
import { IAdminRepository } from "../../domain/repositorys/IAdminRepository";
import { googleDTO } from "../../infra/dto/googleDTO";
import { googleSchema } from "../../infra/schemas/googleSchema";
import { ServerError } from "../../infra/utils/serverError";
import jwt from "jsonwebtoken";

export class AdminLoginGoogleUseCase {
    constructor(
        private readonly adminRepository: IAdminRepository,
        private oauthClient = new OAuth2Client(env.GOOGLE_CLIENT_ID)
    ){}

    async execute(token: googleDTO){
        const parsedData = googleSchema.safeParse(token);
        if (!parsedData.success) throw new ServerError("Invalid ID token");

        const { idToken } = parsedData.data;

        const ticket = await this.oauthClient.verifyIdToken({
            idToken,
            audience: env.GOOGLE_CLIENT_ID
        });

        const data = ticket.getPayload();
        if (!data) throw new ServerError("Invalid ID token");

        const { email, sub } = data;
        if (!email || !sub) throw new ServerError("Missing Google credentials");
        
        const admin = await this.adminRepository.getAdminByEmail(email);
        if (!admin) throw new ServerError("Admin not found", 404);

        if (admin.googleId !== sub) throw new ServerError("Invalid Google Account", 409);
        const tokenJWT = jwt.sign({id: admin.id, cityid: admin.cityId, rememberMe: true}, env.JWT_SECRET, {
            expiresIn: '12h'
        });

        return {tokenJWT, admin};
    }
}