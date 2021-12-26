import { Router } from 'express';

import { sessionRouter } from './sessions.routes';

const routes = Router();

routes.use('/sessions', sessionRouter);

routes.use('/', (_req, res) => {
  res.json({ message: 'Hello World' });
});

export default routes;
