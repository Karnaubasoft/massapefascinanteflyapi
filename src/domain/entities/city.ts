import { Place } from "@prisma/client";
import { Events } from "./event";
import { PhotoDTO } from "../../infra/dto/photoDTO";

export class City {
    constructor(
        public name: string,
        public location: string,
        public description: string,
        public readonly id: string,
        public readonly adminId: string,
        public photos?: PhotoDTO[],
        public places?: Place[],
        public events?: Events[],
        public instagram?: string | null,
    ){}
}