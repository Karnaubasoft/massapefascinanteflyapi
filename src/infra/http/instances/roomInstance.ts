import { RoomCreateUseCase } from "../../../use-cases/room/roomCreateUseCase";
import { RoomDeleteUseCase } from "../../../use-cases/room/roomDeleteUseCase";
import { RoomFindAllUseCase } from "../../../use-cases/room/roomFindAllUseCase";
import { RoomFindAvailableRoomsUseCase } from "../../../use-cases/room/roomFindAvailableRoomsUseCase";
import { RoomFindUniqueUseCase } from "../../../use-cases/room/roomFindUniqueUseCase";
import { RoomUpdateUseCase } from "../../../use-cases/room/roomUpdateUseCase";
import { IPrismaPlaceRepository } from "../../database/IPrismaPlaceRepository";
import { IPrismaRoomRepository } from "../../database/IPrismaRoomRepository";
import { PhotoStorageService } from "../../services/photoStorageService";
import { roomController } from "../controllers/roomController";
import { Multipart } from "../plugins/multipart";


const prismaRoomRepository = new IPrismaRoomRepository();
const prismaPlaceRepository = new IPrismaPlaceRepository();

const photoStorageService = new PhotoStorageService();
const multipart = new Multipart(photoStorageService);

const roomCreateUseCase = new RoomCreateUseCase(prismaPlaceRepository, prismaRoomRepository);
const roomUpdateUseCase = new RoomUpdateUseCase(prismaRoomRepository);
const roomFindAllUseCase = new RoomFindAllUseCase(prismaRoomRepository);
const roomFindUniqueUseCase = new RoomFindUniqueUseCase(prismaRoomRepository);
const roomFindAvailableRoomsUseCase = new RoomFindAvailableRoomsUseCase(prismaRoomRepository);
const roomDeleteUseCase = new RoomDeleteUseCase(prismaRoomRepository);

export const roomInstance = new roomController(
    roomFindUniqueUseCase,
    roomFindAllUseCase,
    roomFindAvailableRoomsUseCase,
    roomCreateUseCase,
    roomUpdateUseCase,
    roomDeleteUseCase,
    multipart
);