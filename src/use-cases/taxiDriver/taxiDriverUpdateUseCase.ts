import { ITaxiDriverRepository } from "../../domain/repositorys/ITaxiDriverRepository";
import { taxiDriverDTO } from "../../infra/dto/taxiDriverDTO";
import { taxiDriverSchema } from "../../infra/schemas/taxiDriverSchema";
import { ServerError } from "../../infra/utils/serverError";
import { updateDefineFields } from "../../infra/utils/updateDefinedFields";

export class TaxiDriverUpdateUseCase {
    constructor(
        private readonly taxiDriverRepository: ITaxiDriverRepository,
    ){}

    async execute(data: taxiDriverDTO, id: string){
        const parsedData = taxiDriverSchema.partial().safeParse(data);
        if (!parsedData.success) throw new ServerError("Bad Request");

        const taxiDriver = await this.taxiDriverRepository.getTaxiDriverById(id);
        if (!taxiDriver) throw new ServerError("Taxi Driver not found", 404);

        updateDefineFields(taxiDriver, parsedData.data);
        await this.taxiDriverRepository.updateTaxiDriver(taxiDriver);

        return taxiDriver;
    }
}