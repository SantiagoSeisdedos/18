import { toPOJO } from "../../utils.js";

export class OrdersDaoMongoose {
  constructor(ordersModel) {
    this.ordersModel = ordersModel;
  }

  async readMany() {
    const orders = await this.ordersModel.find().lean();
    return toPOJO(orders);
  }

  async readOne(id) {
    const order = await this.ordersModel.findById(id).lean();
    return toPOJO(order);
  }

  async createOne(data) {
    const order = await this.ordersModel.create(data);
    return toPOJO(order);
  }

  async updateOne(id, updates) {
    const order = await this.ordersModel
      .findByIdAndUpdate(id, updates, { new: true })
      .lean();
    return toPOJO(order);
  }
}
