import { IPrismaRoomRepository } from "../../infra/database/IPrismaRoomRepository";
import { ServerError } from "../../infra/utils/serverError";

export class RoomFindAvailableRoomsUseCase {
    constructor(private roomRepository: IPrismaRoomRepository) {}

    async execute() {
        const rooms = await this.roomRepository.findAvailableRooms();
        if (!rooms || rooms.length === 0) throw new ServerError("No available rooms found", 404);
        
        return rooms;
    }
}