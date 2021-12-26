import 'reflect-metadata';
import { errors } from 'celebrate';
import cors from 'cors';
import { config } from 'dotenv';
import express from 'express';
import 'express-async-errors';
import errorsMessage from '@shared/infra/http/middlewares/errorsMessages';
import routes from './routes';
import '@shared/container';

config();
const app = express();

app.use(cors({ origin: process.env.APP_HOST || 'http://localhost:3000/' }));
app.use(express.json());
app.use(routes);
app.use(errors());
app.use(errorsMessage);

export { app };
