export class NoServerException extends Error {
    constructor() {
        super('No existe una conexion a un servidor.');
    }
}