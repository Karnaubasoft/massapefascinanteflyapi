import { IPlaceRepository } from "../../../domain/repositorys/IPlaceRepository";
import { ServerError } from "../../../infra/utils/serverError";

export class PlaceDeletePhotoUseCase {
    constructor(private readonly placeRepository: IPlaceRepository){}

    async execute(id: string){
        const isPhotoExist = await this.placeRepository.findPhoto(id);
        if (!isPhotoExist) throw new ServerError("Place not found", 404);

        await this.placeRepository.deletePhoto(id);
    }
}