import { IPrismaRoomRepository } from "../../infra/database/IPrismaRoomRepository";
import { ServerError } from "../../infra/utils/serverError";

export class RoomFindAllUseCase {
    constructor(private roomRepository: IPrismaRoomRepository) {}

    async execute() {
        const rooms = await this.roomRepository.findAll();
        if (!rooms || rooms.length === 0) throw new ServerError("No rooms found", 404);
        
        return rooms;
    }
}