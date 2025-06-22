import { randomUUID } from "crypto";
import { photoSchema } from "../../../infra/schemas/photoSchema";
import { ServerError } from "../../../infra/utils/serverError";
import { IPlaceRepository } from "../../../domain/repositorys/IPlaceRepository";

export class PlaceCreatePhotoUseCase {
    constructor(
        private placeRepository: IPlaceRepository
    ){}

    async execute(photoURLs: string, placeId: string){
        const parsedData = photoSchema.safeParse({ photoURLs });
        if (!parsedData) throw new ServerError("Bad request");

        const isPlaceExist = await this.placeRepository.getPlaceById(placeId);
        if (!isPlaceExist) throw new ServerError("Place not found", 404);

        const id = randomUUID();
        const photo = parsedData.data?.photoURLs!

        const photoURL = await this.placeRepository.createPhoto(id, photo, placeId)
        return photoURL;
    }
}