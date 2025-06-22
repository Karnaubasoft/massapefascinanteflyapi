import { ITaxiDriverRepository } from "../../domain/repositorys/ITaxiDriverRepository";

export class TaxiDriverFindAllUseCase {
    constructor(
        private readonly taxiDriverRepository: ITaxiDriverRepository,
    ) {}

    async execute() {
        const taxiDrivers = await this.taxiDriverRepository.getAllTaxiDriversByCityId();
        if (!taxiDrivers || taxiDrivers.length === 0) throw new Error("No taxi drivers found");

        return taxiDrivers;
    }
}