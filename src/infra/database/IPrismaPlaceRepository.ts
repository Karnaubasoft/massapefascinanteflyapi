import { Category, Photo } from "@prisma/client";
import { IPlaceRepository } from "../../domain/repositorys/IPlaceRepository";
import { prisma } from "../../config/prisma";
import { Place } from "../../domain/entities/places";
import { ServerError } from "../utils/serverError";
import { haversineDistance } from "../utils/haversineDistance";
import { PlaceWithDistance } from "../dto/PlaceWithDistanceDTO";

export class IPrismaPlaceRepository implements IPlaceRepository {
    async createPlace(data: Place): Promise<Place | null> {
        const place = await prisma.place.create({
            data: {
                id: data.id ?? '',
                name: data.name,
                location: data.location,
                description: data.description,
                instagram: data.instagram,
                latitude: data.latitude,
                longitude: data.longitude,
                photos: {
                    create: data.photos?.map(photo => ({
                        id: photo.id,
                        url: photo.url
                    }))
                },
                phone: data.phone,
                category: data.category,
                city: {
                    connect: { id: data.cityId }
                }
            }
        })
        return place;
    }

    async updatePlace(data: Place): Promise<Place | null> {
        const place = await prisma.place.update({
            where: { id: data.id },
            data: {
                name: data.name,
                location: data.location,
                description: data.description,
                instagram: data.instagram,
                phone: data.phone ?? null,
                category: data.category,
                latitude: data.latitude,
                longitude: data.longitude
            }
        })

        return place;
    }

    async deletePlace(id: string): Promise<Place | null> {
        const place = await prisma.place.delete({
            where: { id }
        })

        return place;
    }


    async getPlaceById(id: string): Promise<Place | null> {
        const place = await prisma.place.findUnique({
            where: { id },
            include: {
                photos: true,
                rooms: true,
            }
        })

        return place;
    }

    async getAllPlaces(): Promise<Place[]> {
        const places = await prisma.place.findMany({
            include: {
                photos: true,
                rooms: true,
            }
        })

        return places;
    }

    async getPlacesByCategory(category: Category): Promise<Place[]> {
        const places = await prisma.place.findMany({
            where: {
                category: category
            },
            include: {
                photos: true
            }
        })

        return places;
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

    async createPhoto(id: string, photoURLs: string, idPlace: string): Promise<Photo | null> {
        const photo = await prisma.photo.create({
            data: {
                url: photoURLs,
                id: id,
                placeId: idPlace
            }
        })
        return photo;
    }

    async deletePhoto(id: string): Promise<void> {
            await prisma.photo.delete({
                where: {id}
            })
    }

   async getRelatedPlacesById(id: string): Promise<Place[]> {
    const origin = await prisma.place.findUnique({ where: { id } })

    if (!origin) throw new ServerError('Place not Found', 404)

    const { latitude: originLat, longitude: originLon, category } = origin
    if (originLat == null || originLon == null) throw new ServerError('Latitude and Longitude are required')
    

    const candidates = await prisma.place.findMany({
      where: {
        category,
        latitude: { not: null },
        longitude: { not: null },
        NOT: { id },
      },
    })

    const related: PlaceWithDistance[] = candidates.map((place) => ({
      ...place,
      distance: haversineDistance(
        originLat,
        originLon,
        place.latitude!,
        place.longitude!
      ),
    }))

    return related.sort((a, b) => a.distance - b.distance)
  }

  async getPlacesByCategoryExcludingId(category: string, excludeId: string): Promise<Place[]> {
    return prisma.place.findMany({
      where: {
        category: category as any,
        latitude: { not: null },
        longitude: { not: null },
        NOT: { id: excludeId },
      },
    })
}

}
