import AppError from '@shared/errors/AppError';

class EmailInUseError extends AppError {
  constructor() {
    super('Email address already use', 400);
  }
}

export { EmailInUseError };
