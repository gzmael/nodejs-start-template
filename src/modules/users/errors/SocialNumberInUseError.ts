import AppError from '@shared/errors/AppError';

class SocialNumberInUseError extends AppError {
  constructor() {
    super('Social number already in use', 400);
  }
}

export { SocialNumberInUseError };
