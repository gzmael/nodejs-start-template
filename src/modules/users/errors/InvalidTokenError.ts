import AppError from '@shared/errors/AppError';

class InvalidTokenError extends AppError {
  constructor() {
    super('Token does not exists', 400);
  }
}

export { InvalidTokenError };
