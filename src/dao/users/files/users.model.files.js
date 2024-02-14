// users.model.files.js
import crypto from "crypto";
import { DEFAULT_USER_AVATAR_PATH } from "../../../config/config.js";

export class User {
  #_id;
  #name;
  #lastName;
  #email;
  #age;
  #password;
  #rol;
  #profilePicture;
  #cart;
  #timestamp;

  constructor({
    _id = crypto.randomUUID(),
    name,
    lastName,
    email,
    age,
    password,
    rol = "user",
    profilePicture = DEFAULT_USER_AVATAR_PATH,
    cart,
  }) {
    if (!name || !lastName || !email || !password) {
      throw new Error(
        "Name, last name, email, and password are required fields."
      );
    }

    this.#_id = _id;
    this.#name = name;
    this.#lastName = lastName;
    this.#email = email;
    this.#age = age;
    this.#password = password;
    this.#rol = rol;
    this.#profilePicture = profilePicture;
    this.#cart = cart;
    this.#timestamp = Date.now();
  }

  get _id() {
    return this.#_id;
  }
  get name() {
    return this.#name;
  }
  get lastName() {
    return this.#lastName;
  }
  get email() {
    return this.#email;
  }
  get age() {
    return this.#age;
  }
  get password() {
    return this.#password;
  }
  get rol() {
    return this.#rol;
  }
  get profilePicture() {
    return this.#profilePicture;
  }
  get cart() {
    return this.#cart;
  }
  get timestamp() {
    return this.#timestamp;
  }

  set name(newName) {
    if (!newName) throw new Error("Name cannot be empty.");
    this.#name = newName;
  }

  set lastName(newLastName) {
    if (!newLastName) throw new Error("Last name cannot be empty.");
    this.#lastName = newLastName;
  }

  set email(newEmail) {
    if (!newEmail) throw new Error("Email cannot be empty.");
    this.#email = newEmail;
  }

  set age(newAge) {
    if (!newAge) throw new Error("Age cannot be empty.");
    this.#age = newAge;
  }

  set password(newPassword) {
    if (!newPassword) throw new Error("Password cannot be empty.");
    this.#password = newPassword;
  }

  set rol(newRol) {
    this.#rol = newRol;
  }

  set profilePicture(newProfilePicture) {
    this.#profilePicture = newProfilePicture;
  }

  set cart(newCart) {
    this.#cart = newCart;
  }

  set timestamp(newTimestamp) {
    this.#timestamp = newTimestamp;
  }

  formatTimestamp() {
    return new Date(this.timestamp).toLocaleString();
  }

  toPOJO() {
    return {
      _id: this.#_id,
      name: this.#name,
      lastName: this.#lastName,
      email: this.#email,
      age: this.#age,
      password: this.#password,
      rol: this.#rol,
      profilePicture: this.#profilePicture,
      cart: this.#cart,
      timestamp: this.#timestamp,
    };
  }
}
