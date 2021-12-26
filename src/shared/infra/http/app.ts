import 'reflect-metadata';
import cors from 'cors';
import { config } from 'dotenv';
import express from 'express';
import routes from './routes';

config();
const app = express();

app.use(cors({ origin: process.env.APP_HOST || 'http://localhost:3000/' }));
app.use(express.json());
app.use(routes);

export { app };
