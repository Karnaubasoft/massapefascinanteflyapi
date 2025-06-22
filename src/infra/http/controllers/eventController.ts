import { EventCreateUseCase } from "../../../use-cases/event/eventCreateUseCase";
import { EventUpdateUseCase } from "../../../use-cases/event/eventUpdateUseCase";
import { EventDeleteUseCase } from "../../../use-cases/event/eventDeleteUseCase";
import { EventFindUniqueUseCase } from "../../../use-cases/event/eventFindUniqueUseCase";
import { EventFindAllUseCase } from "../../../use-cases/event/eventFindAllUseCase";
import { FastifyContextDTO } from "../../dto/fastifyContextDTO";
import { Multipart } from "../plugins/multipart";
import { EventUpdatePhotoUseCase } from "../../../use-cases/event/photo/eventUpdatePhotoUseCase";
import { EventCreatePhotoUseCase } from "../../../use-cases/event/photo/eventCreatePhotoUseCase";
import { EventDeletePhotoUseCase } from "../../../use-cases/event/photo/eventDeletePhotoUseCase";
import { EventFindAvailableUseCase } from "../../../use-cases/event/eventFindAvailableUseCase";

export class EventController {
    constructor(
        private readonly multipart: Multipart,
        private readonly createUseCase: EventCreateUseCase,
        private readonly updateUseCase: EventUpdateUseCase,
        private readonly deleteUseCase: EventDeleteUseCase,
        private readonly findUniqueUseCase: EventFindUniqueUseCase,
        private readonly findAllUseCase: EventFindAllUseCase,
        private readonly updatePhotoUseCase: EventUpdatePhotoUseCase,
        private readonly createPhotoUseCase: EventCreatePhotoUseCase,
        private readonly deletePhotoUseCase: EventDeletePhotoUseCase,
        private readonly findAvaliableEvents: EventFindAvailableUseCase
    ) { }

    async create(fastify: FastifyContextDTO) {
        const data = await this.multipart.handleDataMultipart(fastify.req, "event");
        const event = await this.createUseCase.execute(data, fastify.req);
        fastify.res.status(201).send({ message: "Event created", ...event });
    }

    async update(fastify: FastifyContextDTO) {
        const { id } = fastify.req.params as { id: string };
        const data = await this.multipart.handleDataMultipart(fastify.req, "event");

        const updatedEvent = await this.updateUseCase.execute(data, id);
        fastify.res.send({ message: "Updated Event", ...updatedEvent });
    }

    async delete(fastify: FastifyContextDTO) {
        const { id } = fastify.req.params as { id: string };
        await this.deleteUseCase.execute(id);
        fastify.res.send("Deleted event");
    }

    async findUnique(fastify: FastifyContextDTO) {
        const { id } = fastify.req.params as { id: string };
        const event = await this.findUniqueUseCase.execute(id);
        fastify.res.send({...event });
    }

    async findAll(fastify: FastifyContextDTO) {
        const events = await this.findAllUseCase.execute();
        fastify.res.send({...events})
    }

    async findAvaliableEvent(fastify: FastifyContextDTO){
        const events = await this.findAvaliableEvents.execute();
        fastify.res.send({...events})
    }

    async updatePhoto(fastify: FastifyContextDTO) {
        const { id } = fastify.req.params as { id: string };
        const data = await this.multipart.handleDataMultipart(fastify.req, "city", true);
        const photo = await this.updatePhotoUseCase.execute(id, data);
        fastify.res.send({ message: "Updated photo", photo })
    }

    async createPhoto(fastify: FastifyContextDTO) {
        const { eventId } = fastify.req.params as { eventId: string };
        const data = await this.multipart.handleDataMultipart(fastify.req, "event", true);
        const photo = await this.createPhotoUseCase.execute(data, eventId);
        fastify.res.status(201).send({ message: "Photo created", ...photo });
    }

    async deletePhoto(fastify: FastifyContextDTO){
            const { id } = fastify.req.params as { id: string };
            await this.deletePhotoUseCase.execute(id);
            fastify.res.send("Deleted photo");
    }
}