import { PhotoDTO } from "../../infra/dto/photoDTO";

export class Events {
    constructor(
        public name: string,
        public date: Date,
        public lastDate: Date,
        public active: boolean = false,
        public description: string,
        public readonly id: string,
        public cityId: string,
        public location: string,
        public instagram?: string | null,
        public photos?: PhotoDTO[]
    ){}
}