import { Router } from "express";
import { userModel } from "../../dao/models/user.model.js";

export const usersRouter = Router();

usersRouter.post("/", async (req, res) => {
  try {
    const user = await userModel.create(req.body);
    res
      .status(201)
      .json({ payload: user.toObject(), message: "Usuario creado", status: "success" });
  } catch (error) {
    res.status(400).json({ error: error.message || error, status: "error" });
  }
});
