import { IPlaceRepository } from "../../domain/repositorys/IPlaceRepository"
import { haversineDistance } from "../../infra/utils/haversineDistance"
import { ServerError } from "../../infra/utils/serverError"

export class PlaceGetRelatedPlacesByIdUseCase {
  constructor(private readonly placesRepository: IPlaceRepository) {}

  async execute(id: string) {
    const origin = await this.placesRepository.getPlaceById(id)

    if (!origin) throw new ServerError('Place not found', 404)

    const { latitude, longitude, category } = origin
    if (latitude == null || longitude == null)
      throw new ServerError('Latitude and Longitude are required')

    const candidates = await this.placesRepository.getPlacesByCategoryExcludingId(category, id)

    const related = candidates.map((place) => ({
      ...place,
      distance: haversineDistance(latitude, longitude, place.latitude!, place.longitude!),
    }))

    return related.sort((a, b) => a.distance - b.distance)
  }
}
