import { IPrismaRoomRepository } from "../../infra/database/IPrismaRoomRepository";
export class RoomFindAvailableRoomsUseCase {
    constructor(private roomRepository: IPrismaRoomRepository) {}

    async execute() {
        const rooms = await this.roomRepository.findAvailableRooms();
        return rooms ?? [];
    }
}
