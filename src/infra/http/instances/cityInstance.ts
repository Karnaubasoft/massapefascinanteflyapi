import { CityCreatePhotoUseCase } from "../../../use-cases/city/photo/cityCreatePhotoUseCase";
import { CityCreateUseCase } from "../../../use-cases/city/cityCreateUseCase";
import { CityDeletePhotoUseCase } from "../../../use-cases/city/photo/cityDeletePhotoUseCase";
import { CityDeleteUseCase } from "../../../use-cases/city/cityDeleteUseCase";
import { CityFindAllUseCase } from "../../../use-cases/city/cityFindAllUseCase";
import { CityFindUniqueUseCase } from "../../../use-cases/city/cityFindUniqueUseCase";
import { CityUpdatePhotoUseCase } from "../../../use-cases/city/photo/cityUpdatePhotoUseCase";
import { CityUpdateUseCase } from "../../../use-cases/city/cityUpdateUseCase";
import { IPrismaCityRepository } from "../../database/IPrismaCityRepository";
import { PhotoStorageService } from "../../services/photoStorageService";
import { CityController } from "../controllers/cityController";
import { Multipart } from "../plugins/multipart";
import { IPrismaAdminReposotory } from "../../database/IPrismaAdminRepository";

const prismaCityRepository = new IPrismaCityRepository();
const prismaAdminRepository = new IPrismaAdminReposotory();
const photoStorageService = new PhotoStorageService();
const cityCreateUseCase = new CityCreateUseCase(prismaCityRepository, prismaAdminRepository);
const cityUpdateUseCase = new CityUpdateUseCase(prismaCityRepository, prismaAdminRepository)
const cityDeleteUseCase = new CityDeleteUseCase(prismaCityRepository, prismaAdminRepository);
const cityFindAllUseCase = new CityFindAllUseCase(prismaCityRepository);
const cityFindUniqueUseCase = new CityFindUniqueUseCase(prismaCityRepository, prismaAdminRepository);
const cityUpdatePhotoUseCase = new CityUpdatePhotoUseCase(prismaCityRepository);
const cityCreatePhotoUseCase = new CityCreatePhotoUseCase(prismaCityRepository, prismaAdminRepository);
const cityDeletePhotoUseCase = new CityDeletePhotoUseCase(prismaCityRepository);
const multipart = new Multipart(photoStorageService);

export const cityInstance = new CityController(multipart, cityCreateUseCase, cityUpdateUseCase, cityDeleteUseCase, cityFindUniqueUseCase, cityFindAllUseCase, cityUpdatePhotoUseCase, cityCreatePhotoUseCase, cityDeletePhotoUseCase);