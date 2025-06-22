import { CityCreateUseCase } from "../../../use-cases/city/cityCreateUseCase";
import { CityDeleteUseCase } from "../../../use-cases/city/cityDeleteUseCase";
import { CityFindAllUseCase } from "../../../use-cases/city/cityFindAllUseCase";
import { CityFindUniqueUseCase } from "../../../use-cases/city/cityFindUniqueUseCase";
import { CityUpdateUseCase } from "../../../use-cases/city/cityUpdateUseCase";
import { FastifyContextDTO } from "../../dto/fastifyContextDTO";
import { Multipart } from "../plugins/multipart";
import { CityUpdatePhotoUseCase } from "../../../use-cases/city/photo/cityUpdatePhotoUseCase";
import { CityCreatePhotoUseCase } from "../../../use-cases/city/photo/cityCreatePhotoUseCase";
import { CityDeletePhotoUseCase } from "../../../use-cases/city/photo/cityDeletePhotoUseCase";
import { env } from "../../../config/env";

export class CityController {
    constructor(
        private readonly multipart: Multipart,
        private readonly cityCreateUseCase: CityCreateUseCase,
        private readonly cityUpdateUseCase: CityUpdateUseCase,
        private readonly cityDeleteUseCase: CityDeleteUseCase,
        private readonly cityFindUniqueUseCase: CityFindUniqueUseCase,
        private readonly cityFindAllUseCase: CityFindAllUseCase,
        private readonly cityUpdatePhotoUseCase: CityUpdatePhotoUseCase,
        private readonly cityCreatePhotoUseCase: CityCreatePhotoUseCase,
        private readonly cityDeletePhotoUseCase: CityDeletePhotoUseCase
    ){}

    async createCity(fastify: FastifyContextDTO){
        const data = await this.multipart.handleDataMultipart(fastify.req, "city");
        const city = await this.cityCreateUseCase.execute(data, fastify.req);
        fastify.res.status(201).send({message: "City created", ...city});
    }

    async updateCity(fastify: FastifyContextDTO){
        const data = await this.multipart.handleDataMultipart(fastify.req, "city");
        const updatedCity = await this.cityUpdateUseCase.execute(data, fastify.req);
        fastify.res.send({message: "Updated city", updatedCity});
    }

    async deleteCity(fastify: FastifyContextDTO){
        await this.cityDeleteUseCase.execute(fastify.req);
        fastify.res.send("City deleted");
    }

    async findUniqueCity(fastify: FastifyContextDTO){
        const city = await this.cityFindUniqueUseCase.execute(fastify.req);
        fastify.res.send(city);
    }

    async findAllCity(fastify: FastifyContextDTO){
        const citys = await this.cityFindAllUseCase.execute();
        fastify.res.send(citys)
    }

    async updatePhoto(fastify: FastifyContextDTO){
        const { id } = fastify.req.params as { id: string };
        const data = await this.multipart.handleDataMultipart(fastify.req, "city", true);
        const photo = await this.cityUpdatePhotoUseCase.execute(id, data);
        fastify.res.send({message: "Updated photo", photo})
    }

    async createPhoto(fastify: FastifyContextDTO){
        const data = await this.multipart.handleDataMultipart(fastify.req, "city", true);
        const photo = await this.cityCreatePhotoUseCase.execute(data, fastify.req);
        fastify.res.status(201).send({message: "Photo created", ...photo});
    }

    async deletePhoto(fastify: FastifyContextDTO){
        const { id } = fastify.req.params as { id: string };
        await this.cityDeletePhotoUseCase.execute(id);
        fastify.res.send("Deleted photo");
    }
}