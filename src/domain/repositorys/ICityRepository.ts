import { Photo } from "@prisma/client";
import { City } from "../entities/city";

export interface ICityRepository {
    createCity(data: City): Promise<City | null>;
    updateCity(data: City): Promise<City | null>;
    deleteCity(id: string): Promise<City | null>;
    findUnique(id: string): Promise<City | null>;
    getAllCities(): Promise<City[]>;
    existsPlaceInCity(id: string): Promise<boolean>;
    existsEventInCity(id: string): Promise<boolean>;
    updatePhoto(photoId: string, photoURLs: string): Promise<Photo | null>;
    findPhoto(photoId: string): Promise<Photo | null>;
    createPhoto(id: string, photoURLs: string, idCity: string): Promise<Photo | null>;
    deletePhoto(id: string): Promise<void>;
    updateCityId(adminId: string, cityId: string): Promise<void>;
};