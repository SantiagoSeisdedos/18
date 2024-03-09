import { encrypt } from "../utils/crypto.js";

const cookieOptions = {
  httpOnly: true,
  maxAge: 1000 * 60 * 60 * 24,
  signed: true,
};

export async function tokenizeUserInCookie(req, res, next) {
  try {
    console.log("01 tokenizeUserInCookie: ", req.user)
    const token = await encrypt(req.user);
    res.cookie("authorization", token, cookieOptions);
    next();
  } catch (error) {
    console.log("02 ERROR tokenizeUserInCookie: ", error)
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
