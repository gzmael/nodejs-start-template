import AppError from '@shared/errors/AppError';

class InativeUserError extends AppError {
  constructor() {
    super('This user cannot start a session.', 400);
  }
}

export { InativeUserError };
