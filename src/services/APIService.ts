import { Injectable } from "@angular/core";
import { ICommentListPayload, IPostListPayload, RemoteAPIBase } from "./RemoteAPIBase";
import { HttpClient } from "@angular/common/http";
import { MessageService } from "./MessageService";

export interface IPost {
    id: string
    author: string
    created_utc: number
    media: any
    name: string
    num_comments: number
    permalink: string
    preview: any
    score: number
    selftext: string
    selftext_html: string
    subreddit: string
    thumbnail: string
    title: string
    url: string
}

export interface IComment {
    id: string
    author: string
    created_utc: number
    body: string
    body_html: string
    name: string
    permalink: string
    score: number
}

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

    async checkServer(): Promise<boolean> {
        return this.silentPost('/api/misc/check', 'check server').then((res) => {
            try { return res.status === 'OK' } catch { return false }
        })
    }

    async getPosts(payload: IPostListPayload): Promise<IPost[]> {
        return this.post('/api/general/posts', 'get post list', payload).then((res) => {
            return res.posts
        }).catch(() => {
            return null
        })
    }

    async getComments(payload: ICommentListPayload): Promise<IComment[]> {
        return this.post('/api/general/comments', 'get comment list', payload).then((res) => {
            return res.comments
        }).catch(() => {
            return null
        })
    }
}