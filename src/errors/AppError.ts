export class AppError extends Error {
    constructor(
      public readonly message: string,
      public readonly statusCode: number = 400,
      public readonly details?: any
    ) {
      super(message);
      this.name = this.constructor.name;
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  export class ConflictError extends AppError {
    constructor(message: string, details?: any) {
      super(message, 409, details);
    }
  }