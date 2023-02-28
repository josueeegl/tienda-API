import { Router } from "express";
import {
  createUserController,
  getAllUsersController,
  updateUserController,
  deleteUserController, verifyLoginController
} from "../controllers/user";
const router = Router();

router.get("/", getAllUsersController);
router.get("/login", verifyLoginController); 
router.post("/", createUserController);

router.delete("/:id", deleteUserController);
router.put("/:id", updateUserController);

export default router;
