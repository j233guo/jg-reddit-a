import { Injectable } from "@angular/core";
import { ICommentListPayload, IPostListPayload, ISubredditNamesPayload, RemoteAPIBase } from "./RemoteAPIBase";
import { HttpClient } from "@angular/common/http";
import { MessageService } from "./MessageService";
import { IComment, IPost } from "../data/models";

@Injectable({
    providedIn: 'root'
})
export class APIService extends RemoteAPIBase {

    constructor(
        http: HttpClient,
        message: MessageService,
    ) {
        super(http, message)
    }

    /**
     * Checks if the server is available and responding
     * @returns A Promise that resolves to true if the server responds with OK status, false otherwise
     */
    async checkServer(): Promise<boolean> {
        return this.silentPost('/api/misc/check', 'check server').then((res) => {
            try { return res.status === 'OK' } catch { return false }
        })
    }

    /**
     * Retrieves a list of posts based on the provided payload
     * @param payload The search parameters for finding posts
     * @returns A Promise that resolves to an array of posts, or null if the request fails
     */
    async getPosts(payload: IPostListPayload): Promise<IPost[]> {
        return this.post('/api/general/posts', 'get post list', payload).then((res) => {
            return res.posts
        }).catch(() => {
            return null
        })
    }

    /**
     * Retrieves a list of comments based on the provided payload
     * @param payload The search parameters for finding comments
     * @returns A Promise that resolves to an array of comments, or null if the request fails
     */
    async getComments(payload: ICommentListPayload): Promise<IComment[]> {
        return this.post('/api/general/comments', 'get comment list', payload).then((res) => {
            return res.comments
        }).catch(() => {
            return null
        })
    }

    /**
     * Searches for subreddit names based on the provided payload
     * @param payload The search parameters for finding subreddit names
     * @returns A Promise that resolves to an array of subreddit names, or null if the request fails
     */
    async getSubredditNames(payload: ISubredditNamesPayload): Promise<string[]> {
        return this.post('/api/general/search_reddit_names', 'search reddit names', payload).then((res) => {
            return res.names
        }).catch(() => {
            return null
        })
    }
}
