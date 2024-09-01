import { Router } from 'express';
import PostController from '../../controllers/PostController';

const router = Router();

// Registra as rotas do controlador de posts
router.use('/', PostController);

export default router;
