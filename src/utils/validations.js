export function validateLimit(limit) {
  if (Number.isNaN(limit)) {
    throw new Error("El parámetro 'limit' debe ser un número.");
  }
  if (limit <= 0 || limit > 100) {
    throw new Error("El parámetro 'limit' debe ser un número entre 1 y 100.");
  }
}

export function validateProductId(id) {
  if (Number.isNaN(id) || id <= 0) {
    throw new Error("El ID del producto debe ser un número entero positivo.");
  }
}

export function validateArrayOfStrings(arr, fieldName) {
  if (!Array.isArray(arr) || !arr.every((item) => typeof item === "string")) {
    throw new Error(
      `El campo '${fieldName}' debe ser un arreglo que contenga solo strings.`
    );
  }
  if (arr.length === 0) {
    throw new Error(`El campo '${fieldName}' no puede estar vacío.`);
  }
  return true;
}

export function validateType(value, expectedType, fieldName) {
  const valueType = typeof value;
  if (valueType !== expectedType) {
    throw new Error(
      `El tipo de dato para el campo ${fieldName} debe ser ${expectedType}, pero se proporcionó ${valueType}.`
    );
  }
  return true;
}

export function validateUpdates(updates, allowedProperties) {
  return Object.keys(updates).reduce((acc, key) => {
    if (allowedProperties.includes(key)) {
      if (
        updates[key] === undefined ||
        updates[key] === null ||
        updates[key] === ""
      ) {
        throw new Error(`El campo ${key} debe tener un valor definido.`);
      }
      acc[key] = updates[key];
    }
    return acc;
  }, {});
}
