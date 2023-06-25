import { Injectable } from "@angular/core";
import { RemoteAPIBase } from "./RemoteAPIBase";
import { HttpClient } from "@angular/common/http";
import { MessageService } from "./MessageService";

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

    async getPopularPosts() {
        let payload = { subreddit: '/popular', option: 'top' }
        return this.post('list', 'get popular posts', payload).then((res) => {
            return res
        }).catch(() => {
            return null
        })
    }
}