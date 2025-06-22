import { randomUUID } from "crypto";
import { Room } from "../../domain/entities/room";
import { IPlaceRepository } from "../../domain/repositorys/IPlaceRepository";
import { IRoomRepository } from "../../domain/repositorys/IRoomRepository";
import { RoomDTO } from "../../infra/dto/roomDTO";
import { roomSchema } from "../../infra/schemas/roomSchema";
import { ServerError } from "../../infra/utils/serverError";

export class RoomCreateUseCase {
    constructor(
        private readonly placeRepository: IPlaceRepository,
        private readonly roomRepository: IRoomRepository
    ) { }

    async execute(data: RoomDTO, placeId: string) {
        const parsed = roomSchema.safeParse(data);
        if (!parsed.success) throw new ServerError("Bad request");

        const { price, available, photoURLs, description } = parsed.data;

        const place = await this.placeRepository.getPlaceById(placeId);
        if (!place) throw new ServerError("Place not found", 404);

        const { category, rooms } = place;
        if (!["HOTEL", "HOSTING"].includes(category)) throw new ServerError("Only places with category HOTEL or HOSTING can have rooms", 409);

        const roomCount = rooms?.length ?? 0;
        if (category === "HOSTING" && roomCount >= 1) throw new ServerError("HOSTING places can have only one room", 409);

        const id = randomUUID();
        const room = new Room(id, price, available, placeId, photoURLs, description);
        console.log(room)

        await this.roomRepository.createRoom(room);
        return room;
    }
}
