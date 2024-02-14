import fs from "fs/promises";
import { Order } from "./orders.model.files.js";
import { matches, toPOJO } from "../../utils.js";
import { errorStatusMap } from "../../../utils/errorCodes.js";

export class OrdersDaoFiles {
  constructor(path) {
    this.path = path;
  }

  async readMany() {
    throw new Error("Method not implemented");
  }

  async readOne(id) {
    throw new Error("Method not implemented");
  }

  async createOne(data) {
    throw new Error("Method not implemented");
  }

  async updateOne(id, updates) {
    throw new Error("Method not implemented");
  }
}
