import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import { AuthenticateUserController } from '@modules/users/useCases/authenticateUser/AuthenticateUserController';

const sessionRouter = Router();
const authenticateUserController = new AuthenticateUserController();

sessionRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  authenticateUserController.handle,
);

export { sessionRouter };
