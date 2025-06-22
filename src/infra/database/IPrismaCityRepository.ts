import { Photo } from "@prisma/client";
import { prisma } from "../../config/prisma";
import { City } from "../../domain/entities/city";
import { ICityRepository } from "../../domain/repositorys/ICityRepository";

export class IPrismaCityRepository implements ICityRepository {
    async createCity(data: City): Promise<City | null> {
        const city = await prisma.city.create({
            data: {
                id: data.id ?? '',
                name: data.name,
                location: data.location,
                description: data.description,
                instagram: data.instagram,
                adminId: data.adminId,
                photos: {
                   create: data.photos?.map(photo => ({
                        id: photo.id,
                        url: photo.url
                    }))
                },
                places: {
                    connect: data.places?.map(place => ({ id: place.id }))
                }
            }
        })
        return city;
    }

    async updateCity(data: City): Promise<City | null> {
        const city = await prisma.city.update({
            where: { id: data.id },
            data: {
                name: data.name,
                location: data.location,
                description: data.description,
                instagram: data.instagram,
            }
        });

        return city;
    }

    async updateCityId(adminId: string, cityId: string): Promise<void> {
        await prisma.admin.update({
            where: { id: adminId },
            data: { cityId: cityId }
        })
    }

    async deleteCity(id: string): Promise<City | null> {
        const city = await prisma.city.delete({
            where: {id}
        })

        return city;
    }

    async existsEventInCity(id: string): Promise<boolean> {
        const existEvents = await prisma.city.findUnique({
            where: {id},
            include: {
                events: true
            }
        })
        if (existEvents?.events.length === 0) return false;
        return true;
    }

    async existsPlaceInCity(id: string): Promise<boolean> {
        const existPlace = await prisma.city.findUnique({
            where: {id},
            include: {
                places: true
            }
        })
        if (existPlace?.places.length === 0) return false;
        return true;
    }

   async getAllCities(): Promise<City[]> {
  const cities = await prisma.city.findMany({
    include: {
      places: {
        where: {
          category: {
            not: 'HOSTING', 
          },
        },
        include: {
          photos: true,
          rooms: true,
        },
      },
      events: {
        include: {
          photos: true,
        },
      },
      photos: true,
    },
  });

  return cities;
}


async findUnique(id: string): Promise<City | null> {
  const city = await prisma.city.findUnique({
    where: { id },
    include: {
      places: {
        where: {
          category: {
            not: 'HOSTING', // <- Filtra lugares que NÃO são HOSTING
          },
        },
        include: {
          photos: true,
        },
      },
      events: {
        include: {
          photos: true,
        },
      },
      photos: true,
    },
  });

  return city;
}


    async updatePhoto(photoId: string, photoURLs: string): Promise<Photo> {
        const photo = await prisma.photo.update({
            where: {id: photoId},
            data: {
                url: photoURLs
            }
        })

        return photo
    }

    async findPhoto(photoId: string): Promise<Photo | null> {
        const photo = await prisma.photo.findUnique({
            where: {id: photoId}
        })

        return photo;
    }

    async createPhoto(id: string, photoURLs: string, idCity: string): Promise<Photo | null> {
        const photo = await prisma.photo.create({
            data: {
                url: photoURLs,
                id: id,
                cityId: idCity
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

