import { Router } from 'express';
import apiRouter from './api';

const router = Router();

// Registro das rotas da API
router.use('/api', apiRouter);

export default router;
