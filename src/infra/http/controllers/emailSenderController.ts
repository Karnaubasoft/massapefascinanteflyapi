import { FastifyContextDTO } from "../../dto/fastifyContextDTO";
import { CodeResetPassword } from "../../../use-cases/emailSender/codeResetPasswordUseCase";
import { SenderEmailUseCase } from "../../../use-cases/emailSender/senderEmailUseCase";
import { UpdatePasswordUseCase } from "../../../use-cases/emailSender/updatePasswordUseCase";

export class SenderEmailController {
    constructor(
        private senderEmailUseCase: SenderEmailUseCase,
        private codeResetPassword: CodeResetPassword,
        private updatePassword: UpdatePasswordUseCase
    ){}

    async senderEmail(fastify: FastifyContextDTO){
        const { email } = fastify.req.body as { email: string };
        const ip = fastify.req.ip;

        await this.senderEmailUseCase.execute({email, ip});
        fastify.res.send({message: `Send to email: ${email}`})
    }

    async codeReset(fastify: FastifyContextDTO){
        const { email } = fastify.req.body as { email: string };
        const { code } =  fastify.req.params as { code: string };
        const token = await this.codeResetPassword.execute({email, code});
        fastify.res.send({message: "Correct code", token: token});
    }

    async resetPassword(fastify: FastifyContextDTO){
        const { password } = fastify.req.body as { password: string };
        const { token } = fastify.req.params as { token: string }

        const data = await this.updatePassword.execute({ password, token})
        fastify.res.send({message: "Password changed successfully", ...data})
    }
}