import "dotenv/config";
import session from "express-session";
import connectMongo from "connect-mongo";
import { CNX_STR, SESSION_SECRET } from "../config/config.js";

const store = connectMongo.create({
  mongoUrl: CNX_STR,
  ttl: 60 * 60 * 24,
});

export const sessions = session({
  store,
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
});
