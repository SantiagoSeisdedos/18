import { Router } from "express";
import passport from "passport";
import { userModel } from "../../dao/models/user.model.js";
import {
  deleteTokenFromCookie,
  tokenizeUserInCookie,
} from "../../middlewares/tokens.js";

export const sessionsRouter = Router();

sessionsRouter.post(
  "/",
  async (req, res, next) => {
    try {
      const user = await userModel.authentication(req.body);
      req.user = user;
      next();
    } catch (error) {
      next(error);
    }
  },
  tokenizeUserInCookie,
  (req, res) => {
    res.status(201).json({
      status: "success",
      message: "Login successful!",
      payload: req.user,
    });
  }
);

sessionsRouter.delete("/current", deleteTokenFromCookie, (req, res) => {
  res.sendStatus(204);
});

// OLD CODE (before class 13)

// sessionsRouter.post(
//   "/",
//   passport.authenticate("localLogin", {
//     failWithError: true,
//   }),
//   async (req, res, next) => {
//     return res
//       .status(201)
//       .json({ status: "success", message: "Login successful!" });
//   },
//   (err, req, res, next) => {
//     return res.status(401).json({
//       status: "error",
//       message: err.message || "Login failed: Invalid credentials",
//     });
//   }
// );

// sessionsRouter.get("/current", isAuthenticated, (req, res) => {
//   return res.json(req.user);
// });

// sessionsRouter.delete("/current", (req, res) => {
//   req.session.destroy((err) => {
//     if (err) {
//       return res.status(500).json({
//         status: "logout error",
//         message: err,
//       });
//     }
//     return res.json({ status: "success", message: "logout OK" });
//   });
// });
