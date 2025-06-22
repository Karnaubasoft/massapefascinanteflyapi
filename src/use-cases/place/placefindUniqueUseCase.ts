import { ICityRepository } from "../../domain/repositorys/ICityRepository";
import { IPlaceRepository } from "../../domain/repositorys/IPlaceRepository";
import { ServerError } from "../../infra/utils/serverError";

export class PlaceFindUniqueUseCase {
    constructor(
            private placeRepository: IPlaceRepository,
            private cityRepository: ICityRepository
    ){}

    async execute(id: string){
        const isPlaceExist = await this.placeRepository.getPlaceById(id);
        if (!isPlaceExist) throw new ServerError("Place not found", 404);
        
        const isCityExist = await this.cityRepository.findUnique(isPlaceExist.cityId);
        if (!isCityExist) throw new ServerError("City not found", 404);

        await this.placeRepository.getPlaceById(id);
        return isPlaceExist;
    }
}