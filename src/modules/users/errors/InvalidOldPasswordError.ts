import AppError from '@shared/errors/AppError';

class InvalidOldPasswordError extends AppError {
  constructor() {
    super('Invalid old password', 400);
  }
}

export { InvalidOldPasswordError };
