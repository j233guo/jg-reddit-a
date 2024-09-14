import {Injectable} from "@angular/core";
import {ICommentListPayload, IPostListPayload, ISubredditNamesPayload, RemoteAPIBase} from "./RemoteAPIBase";
import {HttpClient} from "@angular/common/http";
import {MessageService} from "./MessageService";
import {IComment, IPost} from "../data/dataTypes";

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

    async getSubredditNames(payload: ISubredditNamesPayload): Promise<string[]> {
        return this.post('/api/general/search_reddit_names', 'search reddit names', payload).then((res) => {
            return res.names
        }).catch(() => {
            return null
        })
    }
}
