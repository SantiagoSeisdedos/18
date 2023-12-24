import { Router } from "express";
import { userModel } from "../../dao/models/user.model.js";
import { ADMIN_EMAIL } from "../../config.js";

export const sessionsRouter = Router();

sessionsRouter.post("/", async (req, res) => {
  try {
    const user = await userModel.findOne(req.body).lean();
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    req.session["user"] = {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
    };

    if (ADMIN_EMAIL.includes(user.email)) {
      req.session["user"].rol = "admin";
    } else {
      req.session["user"].rol = "user";
    }

    return res.status(201).json({
      payload: req.session["user"],
      message: "Login successful!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error loading /login" });
  }
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
