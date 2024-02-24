import { Router } from "express";
import passport from "passport";
import { logger } from "../../utils/logger.js";

export const sessionsRouter = Router();

sessionsRouter.get("/login", (req, res) => {
  try {
    return res.render("login.handlebars", { pageTitle: "Login" });
  } catch (error) {
    logger.info(error);
    return res.status(500).json({ message: "Error loading /login" });
  }
});

sessionsRouter.get("/githubLogin", passport.authenticate("githubLogin"));

sessionsRouter.get(
  "/githubcallback",
  passport.authenticate("githubLogin", {
    successRedirect: "/profile",
    failureRedirect: "/login",
  })
);
