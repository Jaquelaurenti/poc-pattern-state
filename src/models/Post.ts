import { DraftState } from '../states/DraftState';
import { PublishedState } from '../states/PublishedState';
import { PostStateInterface } from '../interfaces/PostStateInterface';
import { v4 as uuidv4 } from 'uuid';

export default class Post {
    public id: string;
    public title: string;
    public content: string;
    public state: PostStateInterface;
    public draftState: PostStateInterface;
    public publishedState: PostStateInterface;
    public createdAt: string;
    public updatedAt: string;

    constructor(title: string, content: string) {
        this.id = uuidv4();
        this.title = title;
        this.content = content;
        this.draftState = new DraftState(this);
        this.publishedState = new PublishedState(this);
        this.state = this.draftState; // Estado inicial
        const now = new Date().toISOString();
        this.createdAt = now;
        this.updatedAt = now;
    }

    setState(state: PostStateInterface): void {
        this.state = state;
    }

    publish(): void {
        this.state.publish();
        this.updatedAt = new Date().toISOString();
    }

    delete(): void {
        this.state.delete();
        this.updatedAt = new Date().toISOString();
    }
}
