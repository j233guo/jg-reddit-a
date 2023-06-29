import { Injectable } from "@angular/core";
import { IListingPayload, RemoteAPIBase } from "./RemoteAPIBase";
import { HttpClient } from "@angular/common/http";
import { MessageService } from "./MessageService";

export interface IPost {
    id: string
    author: string
    media: any
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
    body: string
    body_html: string
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

    async getPostListing(payload: IListingPayload): Promise<IPost[]> {
        return this.post('/api/general/listing', 'get post list', payload).then((res) => {
            return res.posts
        }).catch(() => {
            return null
        })
    }
}