import { Router } from "express";
import {
  sesionControllerLoginUser,
  sessionControllerLogoutUser,
} from "../../controllers/sessions.controller.js";

export const sessionsRouter = Router();

sessionsRouter.post("/", sesionControllerLoginUser);

sessionsRouter.delete("/current", sessionControllerLogoutUser);
