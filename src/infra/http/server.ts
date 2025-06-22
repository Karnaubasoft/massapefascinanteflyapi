import fastifyCookie from "@fastify/cookie";
import fastifyMultipart from "@fastify/multipart";
import fastify, { FastifyReply, FastifyRequest } from "fastify";
import { env } from "../../config/env";
import fastifyRateLimit from "@fastify/rate-limit";
import { registerRoutes } from "./routes/registerRoutes";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastifyCors from "@fastify/cors";
import helmet from '@fastify/helmet';
import { staticFilesPlugin } from "./plugins/static";

const server = fastify();

server.register(fastifyCors, {
    origin: env.PORTFRONT,
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'PUT']
})
server.register(fastifyRateLimit, {
    max: 1000,
    timeWindow: '1 minute',
    keyGenerator: (req) => {
        return req.ip
    },
    skipOnError: true,
})
server.register(staticFilesPlugin)
server.register(fastifyCookie);
server.register(fastifyMultipart, {
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});
server.register(helmet, {
    contentSecurityPolicy: false,
    hsts: env.NODE_ENV === "production",
    crossOriginResourcePolicy: {
        policy: "cross-origin"
    }
});
server.register(fastifySwagger, {
    openapi: {
        info: {
            title: "Karnauba challenge API",
            description: "Karnauba challenge API documentation",
            version: '1.0.0'
        }
    }
});
server.register(fastifySwaggerUi, {
    routePrefix: '/docs',
    uiConfig: {
        docExpansion: 'full'
    }
});
server.register(registerRoutes);

server.get('/', (req: FastifyRequest, res: FastifyReply) =>{
    res.send('Bem vindo a API da Massape Fascinante')
})

server.listen({ port: Number(env.PORT), host: '0.0.0.0' }).then(() => {
    console.log("HTTP SERVER RUNNING!")
})
