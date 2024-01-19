import "dotenv/config";
import session from "express-session";
import connectMongo from "connect-mongo";

const { MONGODB_URL, SESSION_SECRET } = process.env;

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
