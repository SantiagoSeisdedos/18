import { Router } from "express";
import { ProductsDaoMock } from "../../dao/products/mock/products.dao.mock.js";
import { errorStatusMap } from "../../utils/errorCodes.js";

const productsDaoMock = new ProductsDaoMock();

export const mocksRouter = Router();

mocksRouter.get("/mockingproducts", async (req, res, next) => {
  try {
    const products = await productsDaoMock.getProducts();
    res.json(products);
    if (!products.length) {
      const error = new Error("No se encontraron productos.");
      error.code = errorStatusMap.NOT_FOUND;
      throw error;
    }
  } catch (error) {
    if (!error.code) {
      const typedError = new Error(
        "An error occurred while trying to get products."
      );
      typedError.code = errorStatusMap.INTERNAL_SERVER_ERROR;
      next(typedError);
    }
    next(error);
  }
});
