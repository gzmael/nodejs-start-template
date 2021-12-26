import AppError from '@shared/errors/AppError';

class InvalidUserError extends AppError {
  constructor() {
    super('Invalid User', 400);
  }
}

export { InvalidUserError };
