export interface IPhotoStorage {
    buffer: Buffer;
    filename: string;
    mimetype: string;
}

export type PhotoStorageType = "event" | "place" | "city" | "taxiDrivers" | 'room';