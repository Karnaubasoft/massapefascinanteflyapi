import { IPhotoStorage, PhotoStorageType } from "../dto/photoStorageDTO";

export interface PhotoStorageInterface {
    save(data: IPhotoStorage, type: PhotoStorageType): Promise<string>;
}