import express from "express";
import cors from "cors";
import routes from "./routes";

class Server {
  private app: express.Application;
  private port: string;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "3000";
    this.middlewares();
    this.app.use(routes);
  }

  listen = (): void => {
    this.app.listen(this.port, () => {
      console.log("listening on port " + this.port);
    });
  };

  private middlewares = (): void => {
    this.app.use(cors());
    this.app.use(express.json());
  };

}
export default Server;
