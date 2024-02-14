import { encrypt } from "../utils/crypto.js";

const cookieOptions = {
  httpOnly: true,
  maxAge: 1000 * 60 * 60 * 24,
  signed: true,
};

export async function tokenizeUserInCookie(req, res, next) {
  try {
    const token = await encrypt(req.user);
    res.cookie("authorization", token, cookieOptions);
    next();
  } catch (error) {
    next(error);
  }
}

export function deleteTokenFromCookie(req, res, next) {
  try {
    return res.clearCookie("authorization", cookieOptions);
  } catch (error) {
    next(error);
  }
}
