import { Router } from "express";
import { createUserController, deleteUserController, listUserController, updateUserController } from "../controllers/user.controllers";
import { ensureDataIsValid } from "../middlewares/ensureDataIsValid.middleware";
import { ensureEmailExists } from "../middlewares/ensureEmailExists.middleware";
import { ensureTokenIsValid } from "../middlewares/ensureTokenIsValid.middleware";
import { ensureUserExists } from "../middlewares/ensureUserExists.middleware";
import { ensureUserIsAdmin } from "../middlewares/ensureUserIsAdmin.middleware";
import { ensureUserUpdateIsValid } from "../middlewares/ensureUserUpdateIsValid.middleware";
import { userSchema, userUpdateSchema } from "../schemas/user.schema";

const userRoutes: Router = Router();

userRoutes.post("", ensureDataIsValid(userSchema), ensureEmailExists, createUserController);
userRoutes.get("", ensureTokenIsValid, ensureUserIsAdmin, listUserController);
userRoutes.delete("/:id", ensureTokenIsValid, ensureUserExists, ensureUserIsAdmin, deleteUserController);
userRoutes.patch("/:id", ensureTokenIsValid, ensureUserExists, ensureUserUpdateIsValid, ensureDataIsValid(userUpdateSchema), ensureEmailExists, updateUserController);

export { userRoutes } 