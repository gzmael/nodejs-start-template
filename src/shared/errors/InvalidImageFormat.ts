import AppError from './AppError';

class InvalidImageFormatError extends AppError {
  constructor() {
    super('Image format is not a valid.', 400);
  }
}

export { InvalidImageFormatError };
