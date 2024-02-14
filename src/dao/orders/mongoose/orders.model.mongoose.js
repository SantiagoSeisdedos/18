import { Schema } from "mongoose";
import { randomUUID } from "node:crypto";

const orderSchema = new Schema(
  {
    _id: { type: String, default: randomUUID },
    code: { type: String, required: true, unique: true, default: randomUUID },
    purchase_datetime: { type: Date, default: Date.now },
    amount: { type: Number, required: true },
    purchaser: { type: String, required: true },
  },
  {
    strict: "throw",
    versionKey: false,
  }
);

export default orderSchema;
