import AppError from '@shared/errors/AppError';

class InativeUserError extends AppError {
  constructor() {
    super('User still not activated.', 400);
  }
}

export { InativeUserError };
