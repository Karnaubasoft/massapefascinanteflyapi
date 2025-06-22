import { EventCreatePhotoUseCase } from "../../../use-cases/event/photo/eventCreatePhotoUseCase";
import { EventCreateUseCase } from "../../../use-cases/event/eventCreateUseCase";
import { EventDeletePhotoUseCase } from "../../../use-cases/event/photo/eventDeletePhotoUseCase";
import { EventDeleteUseCase } from "../../../use-cases/event/eventDeleteUseCase";
import { EventFindAllUseCase } from "../../../use-cases/event/eventFindAllUseCase";
import { EventFindUniqueUseCase } from "../../../use-cases/event/eventFindUniqueUseCase";
import { EventUpdatePhotoUseCase } from "../../../use-cases/event/photo/eventUpdatePhotoUseCase";
import { EventUpdateUseCase } from "../../../use-cases/event/eventUpdateUseCase";
import { IPrismaCityRepository } from "../../database/IPrismaCityRepository";
import { IPrismaEventRepository } from "../../database/IPrismaEventRepository";
import { PhotoStorageService } from "../../services/photoStorageService";
import { EventController } from "../controllers/eventController";
import { Multipart } from "../plugins/multipart";
import { EventFindAvailableUseCase } from "../../../use-cases/event/eventFindAvailableUseCase";
import { IPrismaAdminReposotory } from "../../database/IPrismaAdminRepository";

const prismaEventRepository = new IPrismaEventRepository()
const prismaCityRepository = new IPrismaCityRepository();
const prismaAdminRepository = new IPrismaAdminReposotory();
const photoStorageService = new PhotoStorageService();
const eventCreateUseCase = new EventCreateUseCase(prismaEventRepository, prismaCityRepository, prismaAdminRepository);
const eventUpdateUseCase = new EventUpdateUseCase(prismaEventRepository, prismaCityRepository)
const eventDeleteUseCase = new EventDeleteUseCase(prismaEventRepository, prismaCityRepository);
const eventFindAllUseCase = new EventFindAllUseCase(prismaEventRepository);
const eventFindUniqueUseCase = new EventFindUniqueUseCase(prismaEventRepository, prismaCityRepository);
const eventUpdatePhotoUseCase = new EventUpdatePhotoUseCase(prismaEventRepository);
const eventCreatePhotoUseCase = new EventCreatePhotoUseCase(prismaEventRepository);
const eventDeletePhotoUseCase = new EventDeletePhotoUseCase(prismaEventRepository);
const eventFindAvailableUseCase = new EventFindAvailableUseCase(prismaEventRepository);
const multipart = new Multipart(photoStorageService);

export const eventInstance = new EventController(multipart, eventCreateUseCase, eventUpdateUseCase, eventDeleteUseCase, eventFindUniqueUseCase, eventFindAllUseCase, eventUpdatePhotoUseCase, eventCreatePhotoUseCase, eventDeletePhotoUseCase, eventFindAvailableUseCase);