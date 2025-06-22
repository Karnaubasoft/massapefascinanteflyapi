import { ICityRepository } from "../../../domain/repositorys/ICityRepository";
import { ServerError } from "../../../infra/utils/serverError";

export class CityDeletePhotoUseCase {
    constructor(private readonly cityRepository: ICityRepository){}

    async execute(id: string){
        const isPhotoExist = await this.cityRepository.findPhoto(id);
        if (!isPhotoExist) throw new ServerError("City not found", 404);

        await this.cityRepository.deletePhoto(id);
    }
}