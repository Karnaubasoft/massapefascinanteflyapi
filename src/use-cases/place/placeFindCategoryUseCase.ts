import { Category } from "@prisma/client";
import { IPlaceRepository } from "../../domain/repositorys/IPlaceRepository";
import { ServerError } from "../../infra/utils/serverError";

export class PlaceFindCategoryUseCase {
    constructor(
        private placeRepository: IPlaceRepository,
    ){}

    async execute(category: Category){
        const validCategory = Object.values(Category).includes(category)
        if (!validCategory) throw new ServerError(`Category ${category} not exist`, 404);

        const findPlaceByCategory = await this.placeRepository.getPlacesByCategory(category);

        console.log(findPlaceByCategory)
        const lengthPlace = findPlaceByCategory.length > 0
        if(!lengthPlace) throw new ServerError("There is no location registered with this category", 404);
        return findPlaceByCategory;
    }
}