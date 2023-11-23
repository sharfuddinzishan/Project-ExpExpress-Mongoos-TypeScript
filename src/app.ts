import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';

const app: Application = express();

app.use(express.json());
app.use(express.text());
app.use(cors());

const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log('Logger');
  next();
};

app.get('/', logger, (req: Request, res: Response) => {
  console.log('API Connected');
  res.send('Everything Worked Fine.');
});

app.all('**', (req: Request, res: Response) => {
  res.status(400).json({
    message: 'No Such Link Exist',
    success: false,
  });
});

export default app;
