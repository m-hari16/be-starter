import { CustomError } from "./errorHandler";

export const validationErrorHandler = (schemaValidation, request) => {
  const onValidate = schemaValidation.validate(request);
  if (onValidate.error) {
    throw new CustomError(onValidate.error.details[0].message, 400);
  }
};
