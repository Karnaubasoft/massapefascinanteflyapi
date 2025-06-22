export class ServerError extends Error {
    constructor(message: string, code: number = 400) {
        super(message);
    }
}