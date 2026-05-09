import { IPlaceRepository } from "../../domain/repositorys/IPlaceRepository";

export class PlaceFindAllUseCase {
    constructor(
            private placeRepository: IPlaceRepository,
    ){}

    async execute(){
        const places = await this.placeRepository.getAllPlaces();
        return places;
    }
}
