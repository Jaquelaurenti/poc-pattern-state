import { Router } from 'express';
import postsRouter from './posts';

const router = Router();

// Registro da rota de posts
router.use('/posts', postsRouter);

export default router;
