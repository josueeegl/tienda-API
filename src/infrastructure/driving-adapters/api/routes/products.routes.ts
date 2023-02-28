import { Router } from "express";
import {
  createProductController,
  updateProductController,
  getAllProductsController,
  deleteProductController,
  getProductByCodeController,
  getProductByIDController,
  getProductByNameController,
} from "../controllers/product";
const router = Router();

router.get("/", getAllProductsController);
router.get("/:id", getProductByIDController);
router.get("/code/:code", getProductByCodeController);
router.get("/name/:name", getProductByNameController);
router.post("/", createProductController);

router.delete("/:id", deleteProductController);
router.put("/:id", updateProductController);

export default router;
