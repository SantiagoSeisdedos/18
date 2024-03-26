import { Router } from "express";
import passport from "passport";
import { UserController } from "../../controllers/users.controller.js";
import { isAuthorized } from "../../middlewares/authorization.js";

export const usersRouter = Router();

usersRouter.post("/", UserController.register);

usersRouter.get(
  "/current",
  passport.authenticate("jwt", { failWithError: true, session: false }),
  isAuthorized(["admin", "user"]),
  UserController.getCurrentUser
);

usersRouter.get(
  "/",
  passport.authenticate("jwt", { failWithError: true, session: false }),
  isAuthorized(["admin"]),
  UserController.getUsers
);

usersRouter.put(
  "/",
  passport.authenticate("jwt", { failWithError: true, session: false }),
  UserController.updateUser
);

usersRouter.post(
  "/premium/:uid",
  passport.authenticate("local", { failWithError: true, session: false }),
  UserController.login
);
