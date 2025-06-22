import { OAuth2Client } from "google-auth-library";
import { IAdminRepository } from "../../domain/repositorys/IAdminRepository";
import { env } from "../../config/env";
import { ServerError } from "../../infra/utils/serverError";
import { Admin } from "../../domain/entities/admin";
import { randomUUID } from "crypto";
import { googleDTO } from "../../infra/dto/googleDTO";
import { googleSchema } from "../../infra/schemas/googleSchema";

export class AdminCreateGoogleUseCase {
    constructor(
        private readonly adminRepository: IAdminRepository,
        private oauthClient = new OAuth2Client(env.GOOGLE_CLIENT_ID)
    ){}

    async execute(token: googleDTO){
        const parsedData = googleSchema.safeParse(token);
        if (!parsedData.success) throw new ServerError("Invalid ID token");
        
        const { idToken } = parsedData.data
        const ticket = await this.oauthClient.verifyIdToken({
            idToken: idToken,
            audience: env.GOOGLE_CLIENT_ID
        })

        const data = ticket.getPayload();
        if (!data) throw new ServerError("Invalid ID token");

        const id = randomUUID();
        const { email, sub, name } = data;

        const isEmailExist = await this.adminRepository.getAdminByEmail(email || '');
        if (isEmailExist) throw new ServerError("This email is alredy in use", 409);  

        if (!email) throw new ServerError("Email not provided by Google");
        if (!name) throw new ServerError("Name not provider by Google");

        const admin = new Admin(id, name, email, null, sub, null);
        await this.adminRepository.upsertGoogleAdminInput(admin);

        return admin;
    }
}