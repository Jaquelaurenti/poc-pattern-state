import Post from '../models/Post';
import { ddbDocClient } from '../config/dynamoDB';
import {
    PutCommand,
    GetCommand,
    UpdateCommand,
    DeleteCommand,
    ScanCommand,
} from "@aws-sdk/lib-dynamodb";

export default class PostService {
    private tableName: string = "Posts";

    // Criar um novo post no DynamoDB
    async createPost(title: string, content: string): Promise<Post> {
        const post = new Post(title, content);
        const params = {
            TableName: this.tableName,
            Item: {
                id: post.id,
                title: post.title,
                content: post.content,
                state: "draft",
                createdAt: post.createdAt,
                updatedAt: post.updatedAt,
            },
        };

        try {
            await ddbDocClient.send(new PutCommand(params));
            console.log(`Post criado com ID: ${post.id}`);
            return post;
        } catch (error) {
            console.error("Erro ao criar post:", error);
            throw new Error("Erro ao criar post");
        }
    }

    // Obter todos os posts
    async getAllPosts(): Promise<Post[]> {
        const params = {
            TableName: this.tableName,
        };

        try {
            const data = await ddbDocClient.send(new ScanCommand(params));
            return data.Items as Post[];
        } catch (error) {
            console.error("Erro ao obter posts:", error);
            throw new Error("Erro ao obter posts");
        }
    }

    // Obter um post por ID
    async getPostById(id: string): Promise<Post | null> {
        const params = {
            TableName: this.tableName,
            Key: { id },
        };

        try {
            const data = await ddbDocClient.send(new GetCommand(params));
            if (data.Item) {
                const post = new Post(data.Item.title, data.Item.content);
                post.id = data.Item.id;
                post.state = data.Item.state === "draft" ? post.draftState : post.publishedState;
                post.createdAt = data.Item.createdAt;
                post.updatedAt = data.Item.updatedAt;
                return post;
            }
            return null;
        } catch (error) {
            console.error("Erro ao obter post:", error);
            throw new Error("Erro ao obter post");
        }
    }

    // Atualizar o estado de um post
    async updatePostState(id: string, newState: string): Promise<void> {
        const params = {
            TableName: this.tableName,
            Key: { id },
            UpdateExpression: "set #s = :s, updatedAt = :u",
            ExpressionAttributeNames: {
                "#s": "state",
            },
            ExpressionAttributeValues: {
                ":s": newState,
                ":u": new Date().toISOString(),
            },
        };

        try {
            await ddbDocClient.send(new UpdateCommand(params));
            console.log(`Post ${id} atualizado para o estado ${newState}`);
        } catch (error) {
            console.error("Erro ao atualizar post:", error);
            throw new Error("Erro ao atualizar post");
        }
    }

    // Deletar um post
    async deletePost(id: string): Promise<void> {
        const params = {
            TableName: this.tableName,
            Key: { id },
        };

        try {
            await ddbDocClient.send(new DeleteCommand(params));
            console.log(`Post ${id} deletado`);
        } catch (error) {
            console.error("Erro ao deletar post:", error);
            throw new Error("Erro ao deletar post");
        }
    }
}
