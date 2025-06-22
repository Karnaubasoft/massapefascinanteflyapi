import { existsSync, mkdirSync } from "fs";
import { join } from "path";
import { PhotoStorageInterface } from "../interfaces/photoStorageInterface";
import { IPhotoStorage } from "../dto/photoStorageDTO";
import { randomUUID } from "crypto";
import { writeFile } from "fs/promises";
import { fileType } from "../utils/fileType";
import { ServerError } from "../utils/serverError";

export class PhotoStorageService implements PhotoStorageInterface{
    private uploads: string = "uploads";
    private uploadsCity = join(this.uploads, "city");
    private uploadsEvent = join(this.uploads, "event");
    private uploadsPlace = join(this.uploads, "place");
    private uploadsTaxiDrivers = join(this.uploads, "taxiDrivers");
    private uploadsRooms = join(this.uploads, 'room')

    constructor(){
        if(!existsSync(this.uploads)) mkdirSync(this.uploads);
        if(!existsSync(this.uploadsCity)) mkdirSync(this.uploadsCity);
        if(!existsSync(this.uploadsEvent)) mkdirSync(this.uploadsEvent);
        if(!existsSync(this.uploadsPlace)) mkdirSync(this.uploadsPlace);
        if(!existsSync(this.uploadsTaxiDrivers)) mkdirSync(this.uploadsTaxiDrivers);
        if(!existsSync(this.uploadsRooms)) mkdirSync(this.uploadsRooms);
    };


    async save(data: IPhotoStorage, type: string): Promise<string> {
        if (!fileType.isImage(data.buffer)) throw new ServerError("File is not an image", 415);
        const uploadPaths = {
            city: this.uploadsCity,
            event: this.uploadsEvent,
            place: this.uploadsPlace,
            taxiDrivers: this.uploadsTaxiDrivers,
            room: this.uploadsRooms
        };
        const typePath = uploadPaths[type as keyof typeof uploadPaths];
        if (!typePath) throw new ServerError("Invalid upload type", 400)

        const uniqueName = `${randomUUID()}-${data.filename}`;
        const path = join(typePath, uniqueName)
        await writeFile(path, data.buffer);
        return uniqueName;
    }
}