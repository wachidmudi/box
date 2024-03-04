import 'dotenv/config';

import cors from 'cors';
import express from 'express';

import { errorHandler } from './middleware/error-handler';
import routes from './routes';

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());
app.use(routes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Fancy Todo App Server is running on http://localhost:${PORT}`);
});
