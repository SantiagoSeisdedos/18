import "dotenv/config";
import { connect as connectToMongoose } from "mongoose";
import { EXECUTION_ENV, CNX_STR } from "../src/config/config.js";

export async function connect() {
  if (EXECUTION_ENV === "prod") {
    await connectToMongoose(CNX_STR);
    console.log(`Database: ${CNX_STR}`);
  } else {
    console.log(`Database: ${CNX_STR}`);
  }
}
