import { CodeResetPassword } from "../../../use-cases/emailSender/codeResetPasswordUseCase";
import { SenderEmailUseCase } from "../../../use-cases/emailSender/senderEmailUseCase";
import { UpdatePasswordUseCase } from "../../../use-cases/emailSender/updatePasswordUseCase";
import { IPrismaAdminReposotory } from "../../database/IPrismaAdminRepository";
import { RedisService } from "../../services/redisService";
import { SenderEmailService } from "../../services/senderEmailService";
import { SenderEmailController } from "../controllers/emailSenderController";

const prismaAdminRepository = new IPrismaAdminReposotory();
const senderEmailService = new SenderEmailService();
const redisService = new RedisService(senderEmailService);
const senderEmailUseCase = new SenderEmailUseCase(prismaAdminRepository, redisService);
const codeResetPassword = new CodeResetPassword(redisService);
const updatePasswordUseCase = new UpdatePasswordUseCase(prismaAdminRepository, redisService);

export const emailSenderInstance = new SenderEmailController(senderEmailUseCase, codeResetPassword, updatePasswordUseCase);