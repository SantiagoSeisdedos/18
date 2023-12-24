import session from "express-session";
import connectMongo from "connect-mongo";
import { MONGODB_URL, SESSION_SECRET } from "../config.js";

const store = connectMongo.create({
  mongoUrl: MONGODB_URL,
  ttl: 60 * 60 * 24,
});

export const sessions = session({
  store,
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
});
