import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controller/userController.js";
import { validateUser } from "../middlewares/inputValidator.js";

export const userRouter = express.Router();

userRouter.post("/user", validateUser, createUser);
userRouter.get("/user", getAllUsers);
userRouter.get("/user/:id", getUserById);
userRouter.put("/user/:id", validateUser, updateUser);
userRouter.delete("/user/:id", deleteUser);

export default userRouter;
