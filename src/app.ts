import cors from 'cors';
import express from 'express';
import { errorHandler } from './utils/error-handler.js';

const app = express();

app.get('/', (_req, res) => {
  res.json('Server ON');
});

app.use(cors({ origin: ['http://localhost:4000/'] }));
app.use(express.json());
app.disable('x-powered-by');

app.use(errorHandler);

export default app;
