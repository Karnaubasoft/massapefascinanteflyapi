import { ICityRepository } from "../../domain/repositorys/ICityRepository";
import { ServerError } from "../../infra/utils/serverError";

export class CityFindAllUseCase {
    constructor(private readonly cityRepository: ICityRepository) {}

    async execute() {
        const cities = await this.cityRepository.getAllCities();
        if (!cities) throw new ServerError("No cities found", 404);
        return cities;
    }
}