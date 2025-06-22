import { AdminCreateGoogleUseCase } from "../../../use-cases/google/adminCreateGoogleUseCase";
import { AdminCreateUseCase } from "../../../use-cases/admin/adminCreateUseCase";
import { AdminDeleteUseCase } from "../../../use-cases/admin/adminDeleteUseCase";
import { AdminFindUniqueUseCase } from "../../../use-cases/admin/adminFindUniqueUseCase";
import { AdminLoginUseCase } from "../../../use-cases/admin/adminLoginUseCase";
import { AdminUpdateUseCase } from "../../../use-cases/admin/adminUpdateUseCase";
import { IPrismaAdminReposotory } from "../../database/IPrismaAdminRepository";
import { AdminController } from "../controllers/adminController";
import { AdminLoginGoogleUseCase } from "../../../use-cases/google/adminLoginGoogleUseCase";

const prismaAdminRepository = new IPrismaAdminReposotory();
const adminCreateUseCase = new AdminCreateUseCase(prismaAdminRepository);
const adminUpdateUseCase = new AdminUpdateUseCase(prismaAdminRepository);
const adminDeleteUseCase = new AdminDeleteUseCase(prismaAdminRepository);
const adminFindUniqueUseCase = new AdminFindUniqueUseCase(prismaAdminRepository);
const adminLoginUseCase = new AdminLoginUseCase(prismaAdminRepository);
const adminCreateGoogleUseCase = new AdminCreateGoogleUseCase(prismaAdminRepository);
const adminLoginGoogleUseCase = new AdminLoginGoogleUseCase(prismaAdminRepository);

export const adminInstace = new AdminController(adminCreateUseCase, adminUpdateUseCase, adminDeleteUseCase, adminFindUniqueUseCase, adminLoginUseCase, adminCreateGoogleUseCase, adminLoginGoogleUseCase);