import AppError from '@shared/errors/AppError';

class CellphoneInUseError extends AppError {
  constructor() {
    super('Cellphone number already in use', 400);
  }
}

export { CellphoneInUseError };
