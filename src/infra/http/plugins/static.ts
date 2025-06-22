import { FastifyInstance } from "fastify";
import { join } from "path";
import fastifyStatic from "@fastify/static"

export async function staticFilesPlugin(fastify: FastifyInstance) {
    const pathToUploads = join(__dirname, '..', '..', '..', '..', 'uploads');
    fastify.register(fastifyStatic, {
        root: pathToUploads,
        prefix: '/uploads/',
    });
}
