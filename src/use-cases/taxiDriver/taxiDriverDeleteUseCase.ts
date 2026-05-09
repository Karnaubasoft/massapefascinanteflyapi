import { ITaxiDriverRepository } from "../../domain/repositorys/ITaxiDriverRepository";
import { ServerError } from "../../infra/utils/serverError";

export class TaxiDriverDeleteUseCase {
    constructor(
        private readonly taxiDriverRepository: ITaxiDriverRepository,
    ){}

    async execute(id: string) {
        const taxiDriver = await this.taxiDriverRepository.getTaxiDriverById(id);
        if (!taxiDriver) throw new ServerError("Taxi Driver not found", 404);

        await this.taxiDriverRepository.deleteTaxiDriver(id);
    }
}
