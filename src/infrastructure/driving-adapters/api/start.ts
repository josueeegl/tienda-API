import Server from "./Server";
import dotenv from "dotenv";

try {
  dotenv.config();
  new Server().listen();
} catch (e) {
  console.log(e);
}
