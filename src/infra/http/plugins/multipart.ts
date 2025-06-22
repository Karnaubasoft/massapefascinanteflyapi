import { FastifyRequest } from "fastify";
import { PhotoStorageService } from "../../services/photoStorageService";
import { PhotoStorageType } from "../../dto/photoStorageDTO";

export class Multipart {
    constructor(private photoStorage: PhotoStorageService){};

    async handleDataMultipart(req: FastifyRequest, type: PhotoStorageType, updatedPhoto: boolean = false){
        const data = req.parts();
        let rawFields: any = {};
        let photoURLs: string[] = [];

        for await(const part of data){
            if(part.type === "file" && part.filename){
                const buffer = await part.toBuffer();
                const { filename, mimetype} = part;
                const url = await this.photoStorage.save({buffer, filename, mimetype}, type);
                photoURLs.push(url);
            } else if (part.type === "field"){
                rawFields[part.fieldname] = part.value;
            }
        }

        rawFields.photoURLs = photoURLs;
        return updatedPhoto ? rawFields.photoURL = photoURLs[0] : rawFields;
    }
}