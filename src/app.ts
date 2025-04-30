import express from 'express';
import cors from 'cors';
import buscaRoutes from './routes/buscaRoutes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(cors());
app.use(express.json());

// Rotas
app.use(buscaRoutes);

app.use(errorHandler); 

export default app;