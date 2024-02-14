import { Router } from "express";
import { validateId } from "../../middlewares/validations.js";
import {
  addProductToCartController,
  deleteProductFromCartController,
  deleteProductsFromCartController,
  getCartController,
  getCartsController,
  postCartController,
  updateProductCartController,
} from "../../controllers/carts.controller.js";
import passport from "passport";
import { isAuthorized } from "../../middlewares/authorization.js";

export const cartsRouter = Router();

// GET ALL
cartsRouter.get("/", getCartsController);

// GET BY ID
cartsRouter.get("/:id", validateId, getCartController);

// POST: Create new cart
cartsRouter.post("/", postCartController);

// POST: Add product to cart by ID
cartsRouter.post(
  "/:id/product/:pid",
  passport.authenticate("jwt", { failWithError: true, session: false }),
  isAuthorized(["user", "admin"]),
  validateId,
  addProductToCartController
);

// DELETE api/carts/:cid/products/:pid deberá eliminar del carrito el producto seleccionado.
cartsRouter.delete(
  "/:id/product/:pid",
  validateId,
  deleteProductFromCartController
);

// PUT api/carts/:cid/products/:pid deberá poder actualizar SÓLO la cantidad de ejemplares del producto por cualquier cantidad pasada desde req.body
cartsRouter.put("/:id/product/:pid", validateId, updateProductCartController);

// // DELETE api/carts/:cid deberá eliminar todos los productos del carrito
cartsRouter.delete("/:id", validateId, deleteProductsFromCartController);
