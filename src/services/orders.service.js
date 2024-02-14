import { daoOrders } from "../dao/daoInstance.js";
import { errorStatusMap } from "../utils/errorCodes.js";

export class OrdersService {
  async createOne(orderData) {
    try {
      const newOrder = await daoOrders.createOne(orderData);
      if (!newOrder) {
        const error = new Error("No se pudo crear la orden");
        error.code = errorStatusMap.UNEXPECTED_ERROR;
        throw error;
      }

      return newOrder;
    } catch (error) {
      throw error;
    }
  }
}

export const ordersService = new OrdersService();
