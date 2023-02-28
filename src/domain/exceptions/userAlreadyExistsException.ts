import { Exception } from "./Exception";

export class UserAlreadyExistsException extends Exception {
  constructor() {
    super("already exists");
    this.spanishMessage = "ya existe";
  }
}
