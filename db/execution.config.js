import "dotenv/config";
import mongoose from 'mongoose'

import { EXECUTION_ENV, CNX_STR } from "../src/config/config.js";
import { logger } from "../src/utils/logger.js";

export async function connectMongoDB() {
  if (EXECUTION_ENV === "prod") {
    await mongoose.connect(CNX_STR);
    logger.info(`Database: ${CNX_STR}`);
  } else {
    logger.info(`Database: ${CNX_STR}`);
  }
}

export async function disconnectMongoDB() {
  await mongoose.disconnect();
  logger.info("Database connection closed");
}
