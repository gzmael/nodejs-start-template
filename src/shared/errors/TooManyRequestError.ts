import AppError from './AppError';

class TooManyRequestError extends AppError {
  constructor() {
    super('Too many requests', 429);
  }
}

export { TooManyRequestError };
