import AppError from '@shared/errors/AppError';

class ExpiredTokenError extends AppError {
  constructor() {
    super('Token expired', 400);
  }
}

export { ExpiredTokenError };
