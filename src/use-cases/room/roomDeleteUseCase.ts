import { IRoomRepository } from "../../domain/repositorys/IRoomRepository";
import { ServerError } from "../../infra/utils/serverError";

export class RoomDeleteUseCase {
    constructor(private roomRepository: IRoomRepository) {}

    async execute(id: string): Promise<void> {
        const room = await this.roomRepository.findById(id);
        if (!room) throw new ServerError("Room not found", 404);

        await this.roomRepository.deleteRoom(id);
    }
}