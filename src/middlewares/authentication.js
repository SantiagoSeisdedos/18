import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { userModel } from "../dao/models/user.model.js";

passport.use(
  "localLogin",
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async function verifyCallback(username, password, done) {
      try {
        const user = await userModel.login(username, password);
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, next) => {
  next(null, user);
});

passport.deserializeUser((user, next) => {
  next(null, user);
});

export const passportInitialize = passport.initialize();
export const passportSession = passport.session();
