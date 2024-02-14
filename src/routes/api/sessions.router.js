import { Router } from "express";
import {
  loginUser,
  logoutUser,
} from "../../controllers/sessions.controller.js";

export const sessionsRouter = Router();

sessionsRouter.post("/", loginUser);

sessionsRouter.delete("/current", logoutUser);
