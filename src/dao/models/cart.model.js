// import { Schema, model } from "mongoose";
// import { randomUUID } from "node:crypto";

// const cartCollection = "carts";

// const cartSchema = new Schema(
//   {
//     _id: { type: String, default: randomUUID },
//     products: {
//       type: [
//         {
//           _id: { type: String, ref: "products" },
//           quantity: { type: Number, min: 1, default: 1 },
//         },
//       ],
//       default: [],
//     },
//   },
//   {
//     strict: "throw",
//     versionKey: false,
//   }
// );

// export const cartModel = model(cartCollection, cartSchema);
