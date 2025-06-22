import { prisma } from "../../config/prisma";
import { Room } from "../../domain/entities/room";
import { IRoomRepository } from "../../domain/repositorys/IRoomRepository";

export class IPrismaRoomRepository implements IRoomRepository {
    async findById(id: string): Promise<Room | null> {
        const room = await prisma.room.findUnique({
            where: { id }
        });
        return room;
    }

    async findAll(): Promise<Room[]> {
        const rooms = await prisma.room.findMany();
        return rooms;
    }

    async findAvailableRooms(): Promise<Room[]> {
        const rooms = await prisma.room.findMany({
            where: { available: true }
        });
        return rooms;
    }

    async createRoom(data: Room): Promise<Room | null> {
        const room = await prisma.room.create({
            data: {
                id: data.id,
                price: data.price,
                available: data.available,
                placeId: data.placeId,
                photoURLs: data.photoURLs,
                description: data.description 
            }
        });
        return room;
    }

    async updateRoom(data: Room): Promise<Room | null> {
        const room = await prisma.room.update({
            where: { id: data.id },
            data: {
                price: data.price,
                available: data.available,
                photoURLs: data.photoURLs,
                description: data.description
            }
        });
        return room;
    }

    async deleteRoom(id: string): Promise<void> {
        await prisma.room.delete({
            where: { id }
        });
    }
}