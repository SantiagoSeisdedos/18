import { Router } from "express";
import passport from "passport";
import { isAuthenticated } from "../../middlewares/authorization.js";

export const sessionsRouter = Router();

sessionsRouter.post("/", async (req, res) => {
  passport.authenticate("localLogin", {
    failWithError: true,
  }),
    async (req, res, next) => {
      res.status(201).json({ status: "success", message: "Login successful!" });
    },
    (err, req, res, next) => {
      res.status(401).json({
        status: "error",
        message: err.message || "Login failed: Invalid credentials",
      });
    };
});

sessionsRouter.get("/current", isAuthenticated, (req, res) => {
  res.json(req.user);
});

sessionsRouter.delete("/current", (req, res) => {
  try {
    req.session.destroy();
    return res.status(204).json({ message: "Logout successful!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error loading /logout" });
  }
});

// Old code
// sessionsRouter.post("/", async (req, res) => {
//   try {
//     const user = await userModel.findOne(req.body).lean();
//     if (!user) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }
//     req.session["user"] = {
//       name: user.name,
//       lastName: user.lastName,
//       email: user.email,
//     };

//     if (ADMIN_EMAIL.includes(user.email)) {
//       req.session["user"].rol = "admin";
//     } else {
//       req.session["user"].rol = "user";
//     }

//     return res.status(201).json({
//       payload: req.session["user"],
//       message: "Login successful!",
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "Error loading /login" });
//   }
// });
