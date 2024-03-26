import "dotenv/config";
import { connect as connectToMongoose } from "mongoose";
import { EXECUTION_ENV, CNX_STR } from "../src/config/config.js";
import { logger } from "../src/utils/logger.js";

export async function connect() {
  if (EXECUTION_ENV === "prod") {
    await connectToMongoose(CNX_STR);
    logger.info(`Database: ${CNX_STR}`);
  } else {
    logger.info(`Database: ${CNX_STR}`);
  }
}