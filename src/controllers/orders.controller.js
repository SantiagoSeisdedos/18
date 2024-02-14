import { cartsService } from "../services/carts.service.js";
import { productsService } from "../services/products.service.js";
import { ordersService } from "../services/orders.service.js";
import { errorStatusMap } from "../utils/errorCodes.js";

export async function postOrderController(req, res, next) {
  try {
    const { email, cart: userCart } = req.body;

    console.log("CONTROLLER user", req.body);

    // Obtener el carrito
    const cart = await cartsService.readOne(userCart[0]._id);

    // Verificar que el carrito existe
    if (!cart) {
      const error = new Error("Carrito no encontrado");
      error.code = errorStatusMap.NOT_FOUND;
      throw error;
    }

    console.log("CONTROLLER cart", cart, userCart[0]._id);

    // Verificar stock y actualizarlo si es necesario
    const productsWithoutStock = [];
    let amount = 0;
    for (const product of cart.products) {
      console.log("product", product);
      const { _id, quantity } = product;
      const productInfo = await productsService.readOne(_id);

      console.log("productInfo", productInfo, quantity);
      if (!productInfo || productInfo.stock < quantity) {
        // Si no hay suficiente stock, agregar el producto a una lista para informar al usuario
        productsWithoutStock.push({
          product: _id,
          stock: productInfo ? productInfo.stock : 0,
        });
      } else {
        // Si hay suficiente stock, restar la cantidad comprada del stock y actualizar el producto
        productInfo.stock -= quantity;
        amount += productInfo.price * quantity;
        await productsService.updateOne(_id, productInfo);
      }
    }

    // Si hay productos sin stock suficiente, informar al usuario y no procesar la compra
    if (productsWithoutStock.length > 0) {
      const error = new Error("Stock insuficiente");
      error.products = productsWithoutStock;
      error.code = errorStatusMap.UNPROCESSABLE_ENTITY;
      throw error;
    }

    // Crear la orden
    const newOrder = await ordersService.createOne({
      purchaser: email,
      amount: amount,
    });

    console.log("CONTROLLER newOrder", newOrder);

    // Limpiar el carrito
    await cartsService.deleteProductsFromCart(userCart[0]._id);

    res.status(201).json(newOrder);
  } catch (error) {
    next(error);
  }
}
