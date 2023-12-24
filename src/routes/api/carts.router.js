import { Router } from "express";
import { cartModel } from "../../dao/models/cart.model.js";

export const cartsRouter = Router();

// GET ALL
cartsRouter.get("/", async (req, res) => {
  try {
    const carts = await cartModel.find().populate("products._id").lean();
    return res.status(200).json(carts);
  } catch (error) {
    console.log("Error al obtener los carts con mongoose: ", error);
    return res.status(500).json({ error: error.message || error });
  }
});

// GET BY ID
cartsRouter.get("/:id", async (req, res) => {
  try {
    if (!req.params.id) return res.status(400).json({ error: "Falta el ID" });
    const cart = await cartModel
      .findById(req.params.id)
      .populate("products._id")
      .lean();
    if (!cart) return res.status(404).json({ error: "Carrito no encontrado" });
    return res.status(200).json(cart);
  } catch (error) {
    console.log("Error al obtener los carts con mongoose: ", error);
    return res.status(500).json({ error: error.message || error });
  }
});

// POST: Create new cart
cartsRouter.post("/", async (req, res) => {
  try {
    const newCart = await cartModel.create({});
    if (!newCart)
      return res.status(404).json({ error: "Error al crear el carrito" });
    return res.status(201).json(newCart);
  } catch (error) {
    return res.status(500).json({ error: error.message || error });
  }
});

// POST: Add product to cart by ID
cartsRouter.post("/:id/product/:pid", async (req, res) => {
  try {
    const { id, pid } = req.params;
    const { quantity } = req.body;

    if (!pid || !quantity) {
      return res.status(400).json({ error: "Se requieren pid y quantity." });
    }

    if (isNaN(quantity)) {
      return res.status(400).json({ error: "quantity debe ser un número." });
    }

    const cart = await cartModel.findById(id);

    if (!cart) {
      return res.status(404).json({ error: "Carrito no encontrado" });
    }

    let existingProductIndex = cart.products.findIndex(
      (product) => product._id === pid
    );

    if (existingProductIndex !== -1) {
      cart.products[existingProductIndex].quantity += parseInt(quantity);

      if (cart.products[existingProductIndex].quantity <= 0) {
        cart.products.splice(existingProductIndex, 1);
      }
    } else {
      if (parseInt(quantity) <= 0) {
        return res.status(400).json({
          error: "No se puede agregar un producto con cantidad menor a 0",
        });
      }

      cart.products.push(pid);
    }

    await cart.save();

    return res.status(200).json(cart);
  } catch (error) {
    console.error("Error al agregar producto al carrito:", error);
    return res.status(500).json({ error: error.message || error });
  }
});

// DELETE api/carts/:cid/products/:pid deberá eliminar del carrito el producto seleccionado.
cartsRouter.delete("/:id/product/:pid", async (req, res) => {
  try {
    const { id, pid } = req.params;

    if (!pid || !id) {
      return res.status(400).json({ error: "Se requieren id y pid." });
    }

    if (typeof id !== "string" || typeof pid !== "string") {
      return res
        .status(400)
        .json({ error: "Los identificadores deben ser strings." });
    }

    const cart = await cartModel.findById(id);

    if (!cart) {
      return res.status(404).json({ error: "Carrito no encontrado" });
    }

    cart.products = cart.products.filter((product) => product._id !== pid);
    await cart.save();

    return res.status(200).json(cart);
  } catch (error) {
    console.error("Error al eliminar producto del carrito:", error);
    return res.status(500).json({ error: error.message || error });
  }
});

// PUT api/carts/:cid/products/:pid deberá poder actualizar SÓLO la cantidad de ejemplares del producto por cualquier cantidad pasada desde req.body
cartsRouter.put("/:id/product/:pid", async (req, res) => {
  try {
    const { id, pid } = req.params;
    const { quantity } = req.body;

    if (!pid || !quantity)
      return res.status(400).json({ error: "Se requieren pid y quantity." });

    if (isNaN(quantity))
      return res.status(400).json({ error: "quantity debe ser un número." });

    const cart = await cartModel.findById(id);
    if (!cart) return res.status(404).json({ error: "Carrito no encontrado" });

    let existingProduct = cart.products.find((product) => product._id === pid);
    if (!existingProduct)
      return res.status(404).json({ error: "Producto no encontrado" });

    existingProduct.quantity = parseInt(quantity);
    if (existingProduct.quantity <= 0) {
      cart.products = cart.products.filter((product) => product._id !== pid);
    }

    await cart.save();

    return res.status(200).json(cart);
  } catch (error) {
    console.error("Error al actualizar producto del carrito:", error);
    return res.status(500).json({ error: error.message || error });
  }
});

// DELETE api/carts/:cid deberá eliminar todos los productos del carrito
cartsRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Validar si se proporciona un ID y es una cadena
    if (!id || typeof id !== "string") {
      return res
        .status(400)
        .json({ error: "Se requiere un identificador de carrito válido." });
    }

    const cart = await cartModel.findById(id);

    // Verificar si se encontró el carrito con el ID proporcionado
    if (!cart) return res.status(404).json({ error: "Carrito no encontrado." });

    // Eliminar todos los productos del carrito
    cart.products = [];
    await cart.save();

    return res.status(200).json(cart);
  } catch (error) {
    console.error("Error al eliminar productos del carrito:", error);
    return res.status(500).json({ error: error.message || error });
  }
});
