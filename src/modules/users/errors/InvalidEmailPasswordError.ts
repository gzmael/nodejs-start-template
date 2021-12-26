import AppError from '@shared/errors/AppError';

class InvalidEmailPasswordError extends AppError {
  constructor() {
    super('Incorrect email/password combination.', 400);
  }
}

export { InvalidEmailPasswordError };
