export class InvalidCredentialsException extends Error {
  constructor() {
    super("El usuario o contraseña no son validos.");
  }
}
