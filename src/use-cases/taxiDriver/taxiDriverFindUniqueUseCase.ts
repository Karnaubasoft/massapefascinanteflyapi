import { ITaxiDriverRepository } from "../../domain/repositorys/ITaxiDriverRepository";

export class TaxiDriverFindUniqueUseCase {
    constructor(
        private readonly taxiDriverRepository: ITaxiDriverRepository
    ) {}

    async execute(id: string) {
        const taxiDriver = await this.taxiDriverRepository.getTaxiDriverById(id);
        if (!taxiDriver) throw new Error("Taxi Driver not found");

        return taxiDriver;
    }
}