import { ICityRepository } from "../../domain/repositorys/ICityRepository";
import { IPlaceRepository } from "../../domain/repositorys/IPlaceRepository";
import { placeDTO } from "../../infra/dto/placeDTO";
import { placeSchema } from "../../infra/schemas/placeSchema";
import { ServerError } from "../../infra/utils/serverError";
import { updateDefineFields } from "../../infra/utils/updateDefinedFields";

export class PlaceUpdateUseCase {
    constructor(
        private placeRepository: IPlaceRepository,
        private cityRepository: ICityRepository
    ){}

    async execute(data: placeDTO, id: string){
        const parsedData = placeSchema.partial().safeParse(data);
        if (!parsedData.success) throw new ServerError("Bad request");
        
        const isPlaceExist = await this.placeRepository.getPlaceById(id);
        if (!isPlaceExist) throw new ServerError("Place not found", 404);

        const isCityExist = await this.cityRepository.findUnique(isPlaceExist.cityId);
        if (!isCityExist) throw new ServerError("City not found", 404);

        updateDefineFields(isPlaceExist, parsedData.data);
        await this.placeRepository.updatePlace(isPlaceExist);

        return isPlaceExist;
    }
}