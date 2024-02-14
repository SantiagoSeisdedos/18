import { errorStatusMap } from "../utils/errorCodes.js";

export const errorHandler = (error, req, res, next) => {
  console.error("_ _ _ _ _ _ Error handler _ _ _ _ _ _ ", error);
  console.error("_ _ _ _ _ _ CODE handler _ _ _ _ _ _ ", error.code); // Imprimirá el código de error
  console.error("_ _ _ _ _ _ STATUS handler _ _ _ _ _ _ ", error.status); // Imprimirá el código de error
  const typeError = Object.keys(errorStatusMap).find(
    (key) => errorStatusMap[key.toUpperCase()] === (error.code || error.status)
  );
  res.status(error.code || error.status || 500).json({
    status: "error",
    message: `${typeError}: ${error.message}`,
  });
};
