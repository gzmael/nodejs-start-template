import AppError from './AppError';

class InvalidJWTToken extends AppError {
  constructor() {
    super('Invalid JWT token', 401);
  }
}

export { InvalidJWTToken };
