export class ServerError extends Error {
    public statusCode: number;

    constructor(message: string, code: number = 400) {
        super(message);
        this.name = "ServerError";
        this.statusCode = code;
    }
}
