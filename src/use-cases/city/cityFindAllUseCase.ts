import { ICityRepository } from "../../domain/repositorys/ICityRepository";
export class CityFindAllUseCase {
    constructor(private readonly cityRepository: ICityRepository) {}

    async execute() {
        const cities = await this.cityRepository.getAllCities();
        return cities ?? [];
    }
}
