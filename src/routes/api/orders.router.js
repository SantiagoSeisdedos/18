import { Router } from "express";
import { postOrderController } from "../../controllers/orders.controller.js";

export const ordersRouter = Router();

ordersRouter.post("/", postOrderController);
