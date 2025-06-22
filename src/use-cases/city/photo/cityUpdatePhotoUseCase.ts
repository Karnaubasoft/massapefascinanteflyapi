import { ICityRepository } from "../../../domain/repositorys/ICityRepository";
import { photoSchema } from "../../../infra/schemas/photoSchema";
import { ServerError } from "../../../infra/utils/serverError";

export class CityUpdatePhotoUseCase {
    constructor(
        private cityRepository: ICityRepository
    ) { }

    async execute(id: string, photoURLs: string) {
        const parsedData = photoSchema.safeParse({ photoURLs });
        if (!parsedData.success) throw new ServerError("Bad request");

        const isPhotoExist = await this.cityRepository.findPhoto(id);
        if (!isPhotoExist) throw new ServerError("Photo not found", 404);

        const updatedPhoto = await this.cityRepository.updatePhoto(id, photoURLs);
        return updatedPhoto;
    }

}