import 'dotenv/config';

import cors from 'cors';
import express from 'express';
import { errorHandler } from './middleware/error-handler';
import routes from './routes';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use(routes);
app.use(errorHandler);

export default app;
