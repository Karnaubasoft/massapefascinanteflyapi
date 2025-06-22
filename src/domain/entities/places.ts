import { Category, Room } from "@prisma/client";
import { PhotoDTO } from "../../infra/dto/photoDTO";

export class Place {
    constructor(
        public name: string,
        public location: string,
        public description: string,
        public category: Category,

        public cityId: string,
        public readonly id: string,
        public phone: string | null,
        public instagram: string | null,
        public latitude?: number | null,
        public longitude?: number | null,
        public photos?: PhotoDTO[],
        public rooms?: Room[]
    ) { }
}