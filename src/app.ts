import cors from 'cors';
import express from 'express';

const app = express();

app.get('/', (_req, res) => {
  res.json('Server ON');
});

app.use(cors({ origin: ['http://localhost:4000/'] }));
app.use(express.json());
app.disable('x-powered-by');

export default app;
