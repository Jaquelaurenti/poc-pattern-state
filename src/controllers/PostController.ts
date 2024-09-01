import { Router, Request, Response } from 'express';
import PostService from '../services/PostService';

const router = Router();
const postService = new PostService();

// GET all posts
router.get('/', async (req: Request, res: Response) => {
    try {
        const posts = await postService.getAllPosts();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
});

// GET a single post by ID
router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const post = await postService.getPostById(id);
        if (post) {
            res.json(post);
        } else {
            res.status(404).json({ message: 'Post não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
});

// POST create a new post
router.post('/', async (req: Request, res: Response) => {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).json({ message: 'Título e conteúdo são obrigatórios' });
    }

    try {
        const post = await postService.createPost(title, content);
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
});

// PUT update the state of a post (e.g., publish)
router.put('/:id/publish', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await postService.updatePostState(id, "published");
        res.json({ message: `Post ${id} publicado com sucesso` });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
});

// DELETE a post
router.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await postService.deletePost(id);
        res.json({ message: `Post ${id} deletado com sucesso` });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
});

export default router;
