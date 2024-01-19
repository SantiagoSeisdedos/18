import cookieParser from "cookie-parser";

const { COOKIE_SECRET } = process.env;

export const cookies = cookieParser(COOKIE_SECRET);
