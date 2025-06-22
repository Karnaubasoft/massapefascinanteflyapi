import { fileTypeFromBuffer } from "file-type";

class FileType {
    async isImage(buffer: Buffer): Promise<boolean>{
        const type = await fileTypeFromBuffer(buffer);
        if (!type) return false;
        return type.mime.startsWith("image/");
    }
}

export const fileType = new FileType();