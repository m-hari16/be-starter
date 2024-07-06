import { baseErrorResponse } from "./baseResponse";

export class CustomError extends Error {
  constructor(message, status = 500) {
    super(message);
    this.status = status;
  }
}

export const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  const status = err.status || 500;
  let message = err.message;

  if (status === 500) {
    console.trace(message);
    message = "Internal Server Error";
  }

  res.status(status).json(baseErrorResponse(message));
};
