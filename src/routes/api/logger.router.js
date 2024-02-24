import { Router } from "express";
import { logger } from "../../utils/logger.js";

export const loggerTestRouter = Router();

loggerTestRouter.get("/", (req, res) => {
  logger.debug("Debug message");
  logger.http("HTTP message");
  logger.info("Info message");
  logger.warn("Warning message");
  logger.error("Error message");
  res.send("Logs printed in console. Check log files for errors.");
});
