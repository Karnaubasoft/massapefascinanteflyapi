import { Photo } from "@prisma/client";
import { Events } from "../entities/event";

export interface IEventRepository {
    createEvent(data: Events): Promise<Events | null>;
    updateEvent(data: Events): Promise<Events | null>;
    deleteEvent(id: string): Promise<Events | null>;
    getEventById(id: string): Promise<Events | null>;
    getAllEvents(): Promise<Events[]>;
    findAvailableEvents(): Promise<Events[]>;
    updatePhoto(photoId: string, photoURLs: string): Promise<Photo | null>;
    findPhoto(photoId: string): Promise<Photo | null>;
    createPhoto(id: string, photoURLs: string, idEvent: string): Promise<Photo | null>;
    deletePhoto(id: string): Promise<void>;
}