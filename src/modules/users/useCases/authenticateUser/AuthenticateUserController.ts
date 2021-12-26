import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AuthenticateUserService } from './AuthenticateUserService';

class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUserService = container.resolve(AuthenticateUserService);

    const result = await authenticateUserService.execute({ email, password });

    return response.json(result);
  }
}

export { AuthenticateUserController };
