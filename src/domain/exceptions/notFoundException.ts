import { Exception } from "./Exception";

export class NotFoundException extends Exception {
  constructor(message: string) {
    super("not found");
    this.spanishMessage = message;
  }
}
