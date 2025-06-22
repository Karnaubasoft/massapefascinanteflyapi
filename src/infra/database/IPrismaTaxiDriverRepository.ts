import { prisma } from "../../config/prisma";
import { TaxiDriver } from "../../domain/entities/taxiDriver";
import { ITaxiDriverRepository } from "../../domain/repositorys/ITaxiDriverRepository";

export class IPrismaTaxiDriverRepository implements ITaxiDriverRepository {
    async createTaxiDriver(taxiDriver: TaxiDriver): Promise<TaxiDriver | null> {
        const taxiDriverCreated = await prisma.taxiDriver.create({
            data: {
                id: taxiDriver.id,
                name: taxiDriver.name,
                photoURLs: taxiDriver.photoURLs,
                phone: taxiDriver.phone,
                workingDescription: taxiDriver.workingDescription,
                cityId: taxiDriver.cityId
            }
        })

        return taxiDriverCreated
    }

    async updateTaxiDriver(taxiDriver: TaxiDriver): Promise<TaxiDriver | null> {
        const taxiDriverUpdated = await prisma.taxiDriver.update({
            where: { id: taxiDriver.id },
            data: {
                name: taxiDriver.name,
                photoURLs: taxiDriver.photoURLs,
                phone: taxiDriver.phone,
                workingDescription: taxiDriver.workingDescription,
                cityId: taxiDriver.cityId
            }
        })
        return taxiDriverUpdated;
    }

    async deleteTaxiDriver(id: string): Promise<void> {
        await prisma.taxiDriver.delete({
            where: { id }
        });
    }

    async getTaxiDriverById(id: string): Promise<TaxiDriver | null> {
        const taxiDriver = await prisma.taxiDriver.findUnique({
            where: { id }
        });

        return taxiDriver;
    }

    async getAllTaxiDriversByCityId(): Promise<TaxiDriver[]> {
        const taxiDrivers = await prisma.taxiDriver.findMany();

        return taxiDrivers;
    }
}