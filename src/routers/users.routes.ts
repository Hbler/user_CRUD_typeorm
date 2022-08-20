import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  editUserController,
  getUserController,
  listUsersController,
} from "../controllers/users.controllers";
import { checkIdMiddleware } from "../middleware/checkId.middleware";
import { validateUserMiddleware } from "../middleware/validateUser.middleware";
import { userSchema } from "../schemas/user.schema";

const routes = Router();

routes.post("", validateUserMiddleware(userSchema), createUserController); //create user
routes.get("", listUsersController); // list all users
routes.get("/:id", checkIdMiddleware, getUserController); // get a user
routes.patch("/:id", checkIdMiddleware, editUserController); // edit user
routes.delete("/:id", checkIdMiddleware, deleteUserController); // delete user

export default routes;
