import { Injectable } from "@angular/core";
import { RemoteAPIBase } from "./RemoteAPIBase";
import { HttpClient } from "@angular/common/http";
import { LoadingService } from "./LoadingService";

@Injectable({
    providedIn: 'root'
})
export class APIService extends RemoteAPIBase {

    constructor(
        http: HttpClient,
        loading: LoadingService,
    ) {
        super(http, loading)
    }

    async checkEngineServer(): Promise<boolean> {
        return this.post('check').then((res) => {
            try { return res.status === 'OK' } catch { return false }
        })
    }

    async getPopularPosts() {
        let payload = { subreddit: 'popular', option: 'top' }
        return this.silentPost('list', payload).then((res) => {
            try { return res } catch { return null }
        })
    }
}