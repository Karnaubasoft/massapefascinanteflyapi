import { IPrismaRoomRepository } from "../../infra/database/IPrismaRoomRepository";
export class RoomFindAllUseCase {
    constructor(private roomRepository: IPrismaRoomRepository) {}

    async execute() {
        const rooms = await this.roomRepository.findAll();
        return rooms ?? [];
    }
}
