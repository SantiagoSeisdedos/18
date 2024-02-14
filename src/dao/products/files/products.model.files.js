import crypto from "crypto";

export class Product {
  #_id;
  #title;
  #price;
  #description;
  #thumbnail;
  #code;
  #status;
  #stock;
  #category;
  #timestamp;

  constructor({
    _id = crypto.randomUUID(),
    title,
    description,
    price,
    thumbnail,
    code,
    status,
    stock,
    category,
  }) {
    if (!title || !description || !price || !code || !stock || !category) {
      throw new Error("Todos los campos son obligatorios.");
    }

    this.#_id = _id;
    this.#title = title;
    this.#description = description;
    this.#price = price;
    this.#thumbnail = thumbnail;
    this.#code = code;
    this.#status = status;
    this.#stock = stock;
    this.#category = category;
    this.#timestamp = Date.now();
  }

  get _id() {
    return this.#_id;
  }
  get title() {
    return this.#title;
  }
  get price() {
    return this.#price;
  }
  get description() {
    return this.#description;
  }
  get thumbnail() {
    return this.#thumbnail;
  }
  get code() {
    return this.#code;
  }
  get status() {
    return this.#status;
  }
  get stock() {
    return this.#stock;
  }
  get category() {
    return this.#category;
  }
  get timestamp() {
    return this.#timestamp;
  }

  set title(newTitle) {
    if (!newTitle) throw new Error("El título no puede estar vacío.");
    this.#title = newTitle;
  }

  set price(newPrice) {
    if (typeof newPrice !== "number" || newPrice <= 0) {
      throw new Error("El precio debe ser un número positivo.");
    }
    this.#price = newPrice;
  }

  set description(newDescription) {
    this.#description = newDescription;
  }

  set thumbnail(newThumbnail) {
    this.#thumbnail = newThumbnail;
  }

  set code(newCode) {
    this.#code = newCode;
  }

  set status(newStatus) {
    this.#status = newStatus;
  }

  set stock(newStock) {
    this.#stock = newStock;
  }

  set category(newCategory) {
    this.#category = newCategory;
  }

  set timestamp(newTimestamp) {
    this.#timestamp = newTimestamp;
  }

  getTotalValue() {
    return this.price * this.stock;
  }

  isAvailable() {
    return this.status && this.stock > 0;
  }

  formatTimestamp() {
    return new Date(this.timestamp).toLocaleString();
  }

  toPOJO() {
    return {
      _id: this.#_id,
      title: this.#title,
      price: this.#price,
      description: this.#description,
      thumbnail: this.#thumbnail,
      code: this.#code,
      status: this.#status,
      stock: this.#stock,
      category: this.#category,
      timestamp: this.#timestamp,
    };
  }
}
