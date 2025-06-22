import { ITaxiDriverRepository } from "../../domain/repositorys/ITaxiDriverRepository";

export class TaxiDriverDeleteUseCase {
    constructor(
        private readonly taxiDriverRepository: ITaxiDriverRepository,
    ){}

    async execute(id: string) {
        const taxiDriver = await this.taxiDriverRepository.getTaxiDriverById(id);
        if (!taxiDriver) throw new Error("Taxi Driver not found");

        await this.taxiDriverRepository.deleteTaxiDriver(id);
    }
}