import cors from 'cors';
import express from 'express';
import apiRouter from './api/api-router.js';
import authRouter from './api/auth/auth-router.js';
import { errorHandler } from './utils/error-handler.js';

const app = express();
app.use(express.json());

app.disable('x-powered-by');

app.get('/', (_req, res) => {
  res.json('Server ON');
});

app.use(cors());

app.use('/auth', authRouter);
app.use('/api/v1', apiRouter);

app.use(errorHandler);

export default app;
