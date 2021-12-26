import AppError from '@shared/errors/AppError';

class InvalidActivateError extends AppError {
  constructor() {
    super('This user cannot be activated', 400);
  }
}

export { InvalidActivateError };
