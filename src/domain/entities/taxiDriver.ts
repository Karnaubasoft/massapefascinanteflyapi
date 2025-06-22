export class TaxiDriver {
    constructor(
        public readonly id: string,
        public name: string,
        public photoURLs: string,
        public phone: string,
        public workingDescription: string,
        public readonly cityId: string
    ) {}
}
