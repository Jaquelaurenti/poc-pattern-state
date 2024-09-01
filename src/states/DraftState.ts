import { PostState } from './PostState';

export class DraftState extends PostState {
    publish(): void {
        console.log('Publicando post...');
        this.post.setState(this.post.publishedState);
    }
}
