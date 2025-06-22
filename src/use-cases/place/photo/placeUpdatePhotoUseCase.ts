import { IPlaceRepository } from "../../../domain/repositorys/IPlaceRepository";
import { photoSchema } from "../../../infra/schemas/photoSchema";
import { ServerError } from "../../../infra/utils/serverError";

export class PlaceUpdatePhotoUseCase {
    constructor(
        private placeRepository: IPlaceRepository
    ) { }

    async execute(id: string, photoURLs: string) {
        const parsedData = photoSchema.safeParse({ photoURLs });
        if (!parsedData.success) throw new ServerError("Bad request");

        const isPhotoExist = await this.placeRepository.findPhoto(id);
        if (!isPhotoExist) throw new ServerError("Photo not found", 404);

        const updatedPhoto = await this.placeRepository.updatePhoto(id, photoURLs);
        return updatedPhoto;
    }

}