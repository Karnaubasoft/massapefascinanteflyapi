import { Photo } from "@prisma/client";
import { prisma } from "../../config/prisma";
import { Events } from "../../domain/entities/event";
import { IEventRepository } from "../../domain/repositorys/IEventRepository";

export class IPrismaEventRepository implements IEventRepository {
    async createEvent(data: Events): Promise<Events | null> {
        const event = await prisma.event.create({
            data: {
                id: data.id ?? '',
                name: data.name,
                date: data.date,
                lastDate: data.lastDate,
                description: data.description,
                photos: {
                    create: data.photos?.map(photo => ({
                        id: photo.id,
                        url: photo.url
                    }))
                },
                instagram: data.instagram,
                cityId: data.cityId,
                location: data.location,
                active: data.active,
            }
        })
        return event;
    }

    async updateEvent(data: Events): Promise<Events | null> {
        const event = await prisma.event.update({
            where: { id: data.id },
            data: {
                name: data.name,
                date: data.date,
                lastDate: data.lastDate,
                description: data.description,
                instagram: data.instagram,
                cityId: data.cityId,
                location: data.location,
                active: data.active,
            }
        })

        return event;
    }


    async deleteEvent(id: string): Promise<Events | null> {
        const event = await prisma.event.delete({
            where: { id }
        })

        return event;
    }

    async getEventById(id: string): Promise<Events | null> {
        const event = await prisma.event.findUnique({
            where: { id },
            include: {
                photos: true
            }
        })

        return event;
    }

    async getAllEvents(): Promise<Events[]> {
        const events = await prisma.event.findMany({
            include: {
                photos: true
            }
        })

        return events;
    }

    async findAvailableEvents(): Promise<Events[]> {
        const events = await prisma.event.findMany({
            where: {active: true},
            include: { photos: true }
        })

        return events;
    }

    async updatePhoto(photoId: string, photoURLs: string): Promise<Photo> {
        const photo = await prisma.photo.update({
            where: { id: photoId },
            data: {
                url: photoURLs
            }
        })

        return photo
    }

    async findPhoto(photoId: string): Promise<Photo | null> {
        const photo = await prisma.photo.findUnique({
            where: { id: photoId }
        })

        return photo;
    }

    async createPhoto(id: string, photoURLs: string, idEvent: string): Promise<Photo | null> {
        const photo = await prisma.photo.create({
            data: {
                url: photoURLs,
                id: id,
                eventId: idEvent
            }
        })
        return photo;
    }

    async deletePhoto(id: string): Promise<void> {
        await prisma.photo.delete({
            where: {id}
        })
    }
}