import { Router } from "express";
import passport from "passport";

export const sessionsRouter = Router();

sessionsRouter.get("/login", (req, res) => {
  try {
    return res.render("login.handlebars", { pageTitle: "Login" });
  } catch (error) {
    console.log(error);
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
