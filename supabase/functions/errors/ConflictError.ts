import AppError from "./AppError.ts";

class BadRequestError extends AppError {
  constructor(message: string) {
    super(message, 409);
    this.name = "ConflictError";
  }
}

export default BadRequestError;
