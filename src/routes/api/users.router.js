// import { Router } from "express";
// import { userModel } from "../../dao/models/user.model.js";
// import { isAuthorized } from "../../middlewares/authorization.js";
// import { tokenizeUserInCookie } from "../../middlewares/tokens.js";
// import passport from "passport";

// export const usersRouter = Router();

// usersRouter.post(
//   "/",
//   async (req, res, next) => {
//     try {
//       const user = await userModel.register(req.body);
//       req.user = user;
//       next();
//     } catch (error) {
//       next(error);
//     }
//   },
//   tokenizeUserInCookie,
//   (req, res) => {
//     res.json(req.user);
//   }
// );

// usersRouter.get(
//   "/current",
//   passport.authenticate("jwt", { failWithError: true, session: false }),
//   async (req, res, next) => {
//     const { name, lastName, email, rol, profilePicture, cart } = req.user;
//     res.json({ name, lastName, email, rol, profilePicture, cart });
//   }
// );

// usersRouter.get(
//   "/",
//   passport.authenticate("jwt", { failWithError: true, session: false }),
//   isAuthorized(["admin"]),
//   async (req, res, next) => {
//     try {
//       const users = await userModel.find().lean();
//       res.json(users);
//     } catch (error) {
//       next(error);
//     }
//   }
// );

// users.router.js
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
