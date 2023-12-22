import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/not-found';
import router from './app/routes';
import cookieParser from 'cookie-parser';

const app: Application = express();

//parser
app.use(express.json());
app.use(cors());
app.use(cookieParser());
// Application Routes
app.use('/api/v1', router);

app.get('/test', (req: Request, res: Response) => {
  res.send('Hello World!');
});
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use(globalErrorHandler);
// Not Found

app.use(notFound);

export default app;
