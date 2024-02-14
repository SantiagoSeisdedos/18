import crypto from "crypto";
export class Order {
  #_id;
  #code;
  #purchase_datetime;
  #amount;
  #purchaser;

  constructor({
    _id = crypto.randomUUID(),
    code = crypto.randomUUID(),
    purchase_datetime = Date.now(),
    amount,
    purchaser,
  }) {
    if (!user || !products) {
      throw new Error("Todos los campos son obligatorios.");
    }

    this.#_id = _id;
    this.#code = code;
    this.#purchase_datetime = purchase_datetime;
    this.#amount = amount;
    this.#purchaser = purchaser;
  }

  get _id() {
    return this.#_id;
  }
  get code() {
    return this.#code;
  }
  get purchase_datetime() {
    return this.#purchase_datetime;
  }
  get amount() {
    return this.#amount;
  }
  get purchaser() {
    return this.#purchaser;
  }
}
