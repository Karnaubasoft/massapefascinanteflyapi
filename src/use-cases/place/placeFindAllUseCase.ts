import { IPlaceRepository } from "../../domain/repositorys/IPlaceRepository";
import { ServerError } from "../../infra/utils/serverError";

export class PlaceFindAllUseCase {
    constructor(
            private placeRepository: IPlaceRepository,
    ){}

    async execute(){
        const places = await this.placeRepository.getAllPlaces();
        const placeLength = places.length > 0;

        if (!places) throw new ServerError("No places found", 404);
        if (!placeLength) throw new ServerError("No places found", 404);
        return places;
    }
}