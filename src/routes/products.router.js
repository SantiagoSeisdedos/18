import { Router } from "express";
import {
  addProduct,
  deleteProductById,
  getProductById,
  getProducts,
  updateProductById,
} from "../controllers/products.controller.js";

export const productsRouter = Router();

// GET
productsRouter.get("/", getProducts);
productsRouter.get("/:id", getProductById);

// POST
productsRouter.post("/", addProduct);

// UPDATE
productsRouter.put("/:id", updateProductById);

// DELETE
productsRouter.delete("/:id", deleteProductById);
