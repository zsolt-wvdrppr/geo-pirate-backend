import AppError from "./AppError.ts";

class BadRequestError extends AppError {
  constructor(message: string) {
    super(message, 404);
    this.name = "NotFoundError";
  }
}

export default BadRequestError;
