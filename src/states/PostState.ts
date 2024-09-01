import { PostStateInterface } from '../interfaces/PostStateInterface';
import Post from '../models/Post';

export class PostState implements PostStateInterface {
    constructor(protected post: Post) {}

    publish(): void {
        console.log('Mudança de estado não permitida.');
    }

    delete(): void {
        console.log('Mudança de estado não permitida.');
    }
}
