import { FastifyRequest } from "fastify";
import { ServerError } from "../../utils/serverError";
import jwt from "jsonwebtoken";
import { env } from "process";
import { userData } from "../../types/userData";

export async function authMiddleware(req: FastifyRequest){
    const token = req.cookies.token;
    if (!token) throw new ServerError("Unauthorized", 401);

    const decoded = jwt.verify(token, env.JWT_SECRET as string) as userData;
    req.user = decoded;
}