import { Injectable } from "@angular/core";
import { RemoteAPIService } from "./remoteAPIService";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class ContentService extends RemoteAPIService {

    constructor(
        http: HttpClient
    ) {
        super(http)
    }

    async getPopularPosts() {
        let payload = { subreddit: 'popular', option: 'top' }
        return this.post('list', payload).then((res) => {
            try { return res } catch { return null }
        })
    }
}