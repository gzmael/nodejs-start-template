import AppError from './AppError';

class InvalidAccessError extends AppError {
  constructor() {
    super('You do not have access to this action.', 403);
  }
}

export { InvalidAccessError };
