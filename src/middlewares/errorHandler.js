import { errorStatusMap } from "../utils/errorCodes.js";
import { logger } from "../utils/logger.js";

export const errorHandler = (error, req, res, next) => {
  const typeError = Object.keys(errorStatusMap).find(
    (key) => errorStatusMap[key.toUpperCase()] === (error.code || error.status)
  );
  logger.error(
    `${typeError} - ${error.message} | [STATUS: ${error.code || error.status || 500}]`
  );

  res.status(error.code || error.status || 500).json({
    status: "error",
    message: `${typeError}: ${error.message}`,
  });
};
