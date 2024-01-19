import { hashSync, compareSync, genSaltSync } from "bcrypt";
import jwt from "jsonwebtoken";
import { errorStatusMap } from "./errorCodes.js";

const { JWT_SECRET } = process.env;
export function hashPassword(phrase) {
  if (!phrase) throw new Error("Can't hash empty phrase: ", phrase);
  return hashSync(phrase, genSaltSync(10));
}

export function areHashesEqual(received, stored) {
  return compareSync(received, stored);
}

export function encrypt(data) {
  return new Promise((resolve, reject) => {
    if (!data) {
      const typedError = new Error("No data to encrypt");
      typedError.code = errorStatusMap.INTERNAL_SERVER_ERROR;
      reject(typedError);
    }
    jwt.sign(
      data,
      JWT_SECRET,
      { expiresIn: 24 * 60 * 60 }, // 24 hours
      (err, encoded) => {
        if (err) {
          const typedError = new Error(err.message);
          typedError.code = errorStatusMap.INTERNAL_SERVER_ERROR;
          reject(typedError);
        } else {
          resolve(encoded);
        }
      }
    );
  });
}

export function decrypt(token) {
  return new Promise((resolve, reject) => {
    if (!token) return reject(new Error("No token to decrypt"));
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) reject(err);
      resolve(decoded);
    });
  });
}
