import { config } from 'dotenv';
import express from 'express';

config();
const app = express();

app.use(express.json());

export { app };
