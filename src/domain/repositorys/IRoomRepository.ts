import { Room } from "../entities/room";

export interface IRoomRepository {
    findById(id: string): Promise<Room | null>;
    findAll(): Promise<Room[]>; 
    findAvailableRooms(): Promise<Room[]>;
    createRoom(data: Room): Promise<Room | null>;
    updateRoom(data: Room): Promise<Room | null>;
    deleteRoom(id: string): Promise<void>

}

