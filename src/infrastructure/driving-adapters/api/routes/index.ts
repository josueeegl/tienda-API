import { Request, Response, Router, NextFunction } from "express";
import userRoutes from "./users.routes";
import productRoutes from "./products.routes";
import { Exception } from "../../../../domain/exceptions/Exception";

const route = Router();

route.use("/user", userRoutes);
route.use("/products", productRoutes);
route.use("/*", (req: Request, res: Response) => {
  res.status(404).send("invalid request, check url"); 
});

route.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Exception) {
    res.status(400).json({
      message: err.spanishMessage,
    });
  } else {
    next(err);
  }
});

route.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  res.status(500).json({
    error: err,
  });
});

export default route;
