import { Request, Response } from 'express';

class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    return response.json({
      message: 'Hello World',
    });
  }
}

export { AuthenticateUserController };
