import { Category } from "@prisma/client";
import { PlaceCreateUseCase } from "../../../use-cases/place/placeCreateUseCase";
import { PlaceDeleteUseCase } from "../../../use-cases/place/placeDeleteUseCase";
import { PlaceFindAllUseCase } from "../../../use-cases/place/placeFindAllUseCase";
import { PlaceFindCategoryUseCase } from "../../../use-cases/place/placeFindCategoryUseCase";
import { PlaceFindUniqueUseCase } from "../../../use-cases/place/placefindUniqueUseCase";
import { PlaceUpdateUseCase } from "../../../use-cases/place/placeUpdateUseCase";
import { FastifyContextDTO } from "../../dto/fastifyContextDTO";
import { Multipart } from "../plugins/multipart";
import { PlaceUpdatePhotoUseCase } from "../../../use-cases/place/photo/placeUpdatePhotoUseCase";
import { PlaceCreatePhotoUseCase } from "../../../use-cases/place/photo/placeCreatePhotoUseCase";
import { PlaceDeletePhotoUseCase } from "../../../use-cases/place/photo/placeDeletePhotoUseCase";
import { PlaceGetRelatedPlacesByIdUseCase } from "../../../use-cases/place/placegetRelatedPlacesByIdUseCase";

export class PlaceController {
    constructor(
        private readonly multipart: Multipart,
        private readonly createUseCase: PlaceCreateUseCase,
        private readonly updateUseCase: PlaceUpdateUseCase,
        private readonly deleteUseCase: PlaceDeleteUseCase,
        private readonly findByCategoryUseCase: PlaceFindCategoryUseCase,
        private readonly findUniqueUseCase: PlaceFindUniqueUseCase,
        private readonly findAllUseCase: PlaceFindAllUseCase,
        private readonly updatePhotoUseCase: PlaceUpdatePhotoUseCase,
        private readonly createPhotoUseCase: PlaceCreatePhotoUseCase,
        private readonly deletePhotoUseCase: PlaceDeletePhotoUseCase,
        private readonly getRelatedPlacesByIdUseCase: PlaceGetRelatedPlacesByIdUseCase
    ) { }

    async create(fastify: FastifyContextDTO) {
        const data = await this.multipart.handleDataMultipart(fastify.req, "place");
        const place = await this.createUseCase.execute(data, fastify.req);
        fastify.res.status(201).send({ message: "Place created", ...place });
    }

    async update(fastify: FastifyContextDTO) {
        const { id } = fastify.req.params as { id: string };
        const data = await this.multipart.handleDataMultipart(fastify.req, "place");
        const updatedPlace = await this.updateUseCase.execute(data, id);
        fastify.res.send({ message: "Updated place", place: updatedPlace })
    }

    async delete(fastify: FastifyContextDTO) {
        const { id } = fastify.req.params as { id: string };
        await this.deleteUseCase.execute(id);
        fastify.res.send("Place deleted");
    }

    async findByCategory(fastify: FastifyContextDTO) {
        const { category } = fastify.req.params as { category: Category };
        const placesByCategory = await this.findByCategoryUseCase.execute(category);
        fastify.res.send({ message: `Places by category: ${category}`, ...placesByCategory });
    }

    async findUnique(fastify: FastifyContextDTO) {
        const { id } = fastify.req.params as { id: string };
        const place = await this.findUniqueUseCase.execute(id);
        fastify.res.send(place);
    }

    async findAll(fastify: FastifyContextDTO) {
        const places = await this.findAllUseCase.execute();
        fastify.res.send(places)
    }

    async updatePhoto(fastify: FastifyContextDTO) {
        const { id } = fastify.req.params as { id: string };
        const data = await this.multipart.handleDataMultipart(fastify.req, "place", true);
        const photo = await this.updatePhotoUseCase.execute(id, data);
        fastify.res.send({ message: "Updated photo", photo })
    }

    async createPhoto(fastify: FastifyContextDTO) {
        const { placeId } = fastify.req.params as { placeId: string };
        const data = await this.multipart.handleDataMultipart(fastify.req, "place", true);
        const photo = await this.createPhotoUseCase.execute(data, placeId);
        fastify.res.status(201).send({ message: "Photo created", ...photo });
    }

    async deletePhoto(fastify: FastifyContextDTO) {
        const { id } = fastify.req.params as { id: string };
        await this.deletePhotoUseCase.execute(id);
        fastify.res.send("Deleted photo");
    }

    async getRelatedPlacesById(fastify: FastifyContextDTO) {
        const { id } = fastify.req.params as { id: string }

        const relatedPlaces = await this.getRelatedPlacesByIdUseCase.execute(id)

        fastify.res.send({
            message: `Related places to ${id}`,
            relatedPlaces,
        })
    }

}