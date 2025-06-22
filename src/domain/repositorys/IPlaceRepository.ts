import { Category, Photo } from "@prisma/client";
import { Place } from "../entities/places";

export interface IPlaceRepository {
    createPlace(data: Place): Promise<Place | null>;
    updatePlace(data: Place): Promise<Place | null>;
    deletePlace(id: string): Promise<Place | null>;
    getPlaceById(id: string): Promise<Place | null>;
    getAllPlaces(): Promise<Place[]>;
    getPlacesByCategory(category: Category): Promise<Place[]>;
    getRelatedPlacesById(id: string): Promise<Place[]>
    getPlacesByCategoryExcludingId(category: string, excludeId: string): Promise<Place[]>
    updatePhoto(photoId: string, photoURLs: string): Promise<Photo | null>;
    findPhoto(photoId: string): Promise<Photo | null>;
    createPhoto(id: string, photoURLs: string, idPlace): Promise<Photo | null>;
    deletePhoto(id: string): Promise<void>;
};