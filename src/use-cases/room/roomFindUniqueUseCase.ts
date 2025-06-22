import { IPrismaRoomRepository } from "../../infra/database/IPrismaRoomRepository";
import { ServerError } from "../../infra/utils/serverError";

export class RoomFindUniqueUseCase {
    constructor(private roomRepository: IPrismaRoomRepository) {}

    async execute(id: string) {
        const room = await this.roomRepository.findById(id);
        if (!room) throw new ServerError("Room not found", 404);
        
        return room;
    }
}