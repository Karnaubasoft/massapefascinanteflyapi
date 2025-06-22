export class Room {
    constructor(
        public readonly id: string,
        public price: number,
        public available: boolean = true,
        public readonly placeId: string,
        public photoURLs: string[] = [],
        public description: string | null
    ) {}
}