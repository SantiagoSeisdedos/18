import { Router } from "express";
import {
  addProductToCart,
  createCart,
  getCartById,
} from "../controllers/carts.controller.js";

export const cartsRouter = Router();

// GET
cartsRouter.get("/:id", getCartById);

// POST
cartsRouter.post("/", createCart);
cartsRouter.post("/:id/product/:pid", addProductToCart);
