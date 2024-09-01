import { PostState } from './PostState';

export class PublishedState extends PostState {
    delete(): void {
        console.log('Deletando post publicado...');
        this.post.setState(this.post.draftState);
    }
}
