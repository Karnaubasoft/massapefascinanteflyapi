import { RoomCreateUseCase } from "../../../use-cases/room/roomCreateUseCase";
import { RoomDeleteUseCase } from "../../../use-cases/room/roomDeleteUseCase";
import { RoomFindAllUseCase } from "../../../use-cases/room/roomFindAllUseCase";
import { RoomFindAvailableRoomsUseCase } from "../../../use-cases/room/roomFindAvailableRoomsUseCase";
import { RoomFindUniqueUseCase } from "../../../use-cases/room/roomFindUniqueUseCase";
import { RoomUpdateUseCase } from "../../../use-cases/room/roomUpdateUseCase";
import { FastifyContextDTO } from "../../dto/fastifyContextDTO";
import { RoomDTO } from "../../dto/roomDTO";
import { Multipart } from "../plugins/multipart";

export class roomController {
    constructor(
        private readonly roomFindUniqueUseCase: RoomFindUniqueUseCase,
        private readonly roomFindAllUseCase: RoomFindAllUseCase,
        private readonly roomFindAvailableRoomsUseCase: RoomFindAvailableRoomsUseCase,
        private readonly roomCreateUseCase: RoomCreateUseCase,
        private readonly roomUpdateUseCase: RoomUpdateUseCase,
        private readonly roomDeleteUseCase: RoomDeleteUseCase,
        private readonly multipart: Multipart
    ) {}

    async findUnique(fastify: FastifyContextDTO) {
        const { id } = fastify.req.params as { id: string };
        const room = await this.roomFindUniqueUseCase.execute( id );
        fastify.res.send(room);
    } 

    async findAll(fastify: FastifyContextDTO) {
        const rooms = await this.roomFindAllUseCase.execute();
        fastify.res.send(rooms);
    } 

    async findAvailableRooms(fastify: FastifyContextDTO) {
        const rooms = await this.roomFindAvailableRoomsUseCase.execute();
        fastify.res.send(rooms);
    }

    async create(fastify: FastifyContextDTO) {
        const { id } = fastify.req.params as { id: string }; 
        const data = await this.multipart.handleDataMultipart(fastify.req, 'room');
        const room = await this.roomCreateUseCase.execute(data, id);
        fastify.res.status(201).send({ message: "Room created", ...room });
    }

    async update(fastify: FastifyContextDTO) {
        const { id } = fastify.req.params as { id: string };
        const data = await this.multipart.handleDataMultipart(fastify.req, 'room');
        const updatedRoom = await this.roomUpdateUseCase.execute(data, id);
        fastify.res.send({ message: "Updated room", ...updatedRoom });
    }

    async delete(fastify: FastifyContextDTO) {
        const { id } = fastify.req.params as { id: string };
        await this.roomDeleteUseCase.execute(id);
        fastify.res.send("Room deleted");
    }

}