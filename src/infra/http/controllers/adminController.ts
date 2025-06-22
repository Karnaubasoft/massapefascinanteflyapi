import { AdminDeleteUseCase } from "../../../use-cases/admin/adminDeleteUseCase";
import { AdminCreateUseCase } from "../../../use-cases/admin/adminCreateUseCase";
import { AdminUpdateUseCase } from "../../../use-cases/admin/adminUpdateUseCase";
import { AdminFindUniqueUseCase } from "../../../use-cases/admin/adminFindUniqueUseCase";
import { FastifyContextDTO } from "../../dto/fastifyContextDTO";
import { adminDTO, adminLoginDTO } from "../../dto/adminDTO";
import { AdminLoginUseCase } from "../../../use-cases/admin/adminLoginUseCase";
import { env } from "../../../config/env";
import { AdminCreateGoogleUseCase } from "../../../use-cases/google/adminCreateGoogleUseCase";
import { AdminLoginGoogleUseCase } from "../../../use-cases/google/adminLoginGoogleUseCase";

export class AdminController {
  constructor(
    private readonly adminCreateUseCase: AdminCreateUseCase,
    private readonly adminUpdateUseCase: AdminUpdateUseCase,
    private readonly adminDeleteUseCase: AdminDeleteUseCase,
    private readonly adminFindUniqueUseCase: AdminFindUniqueUseCase,
    private readonly adminLoginUseCase: AdminLoginUseCase,
    private readonly adminCreateGoogleUseCase: AdminCreateGoogleUseCase,
    private readonly adminLoginGoogleUseCase: AdminLoginGoogleUseCase
  ) {}

  async create(fastify: FastifyContextDTO) {
    const data = fastify.req.body as adminDTO;
    const admin = await this.adminCreateUseCase.execute(data);
    return fastify.res.status(201).send({ message: "Admin created", admin });
  }

  async update(fastify: FastifyContextDTO) {
    const data = fastify.req.body as adminDTO;
    const admin = await this.adminUpdateUseCase.execute(data, fastify.req);
    return fastify.res.status(200).send({ message: "Updated admin", admin });
  }

  async delete(fastify: FastifyContextDTO) {
    await this.adminDeleteUseCase.execute(fastify.req);
    return fastify.res.status(200).send({ message: "Deleted admin" });
  }

  async findUnique(fastify: FastifyContextDTO) {
    const admin = await this.adminFindUniqueUseCase.execute(fastify.req);
    return fastify.res.status(200).send({ message: "Admin found", admin });
  }

  async login(fastify: FastifyContextDTO) {
    const data = fastify.req.body as adminLoginDTO;
    const token = await this.adminLoginUseCase.execute(data);
    return fastify.res
      .setCookie("token", token.token, {
        httpOnly: true,
        secure: env.NODE_ENV === "production",
        sameSite: "none",
        path: "/",
        maxAge: token.remenberMe ? 3600 * 24 * 30 : 60 * 60 * 24,
      })
      .status(200)
      .send({ message: "Admin logged in", remenberMe: token.remenberMe });
  }

  async logout(fastify: FastifyContextDTO) {
    fastify.res.clearCookie("token", { path: "/" });
    return fastify.res.status(200).send({ message: "Logout successful" });
  }

  async createWithGoogle(fastify: FastifyContextDTO) {
    const { idToken } = fastify.req.body as { idToken: string };
    const admin = await this.adminCreateGoogleUseCase.execute({ idToken });
    fastify.res.status(201).send({ message: "Admin created", admin });
  }

  async loginWithGoogle(fastify: FastifyContextDTO) {
    const { idToken } = fastify.req.body as { idToken: string };
    const admin = await this.adminLoginGoogleUseCase.execute({ idToken });
    fastify.res.setCookie("token", admin.tokenJWT, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 3600 * 24 * 7,
    });
  }
}
