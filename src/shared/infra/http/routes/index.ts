import { Router } from 'express';

const routes = Router();

routes.use('/', (req, res) => {
  res.json({ message: 'Hello World' });
});

export default routes;
