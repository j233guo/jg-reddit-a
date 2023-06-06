import { Injectable } from "@angular/core";
import { RemoteAPIService } from "./RemoteAPIService";
import { HttpClient } from "@angular/common/http";
import { TrackableSubjectWrapper } from "src/lib/TrackableObservable";
import { RecursiveReadonly } from "src/lib/tslang";
import { IContent } from "src/data/dataTypes";
import { Subject } from "rxjs";
import { LoadingService } from "./LoadingService";

type SubjectPostListData = TrackableSubjectWrapper<RecursiveReadonly<IContent>, Subject<RecursiveReadonly<IContent>>>

@Injectable({
    providedIn: 'root'
})
export class ContentService extends RemoteAPIService {

    constructor(
        http: HttpClient,
        loading: LoadingService,
    ) {
        super(http, loading)
    }

    async getPopularPosts() {
        let payload = { subreddit: 'popular', option: 'top' }
        return this.post('list', payload).then((res) => {
            try { return res } catch { return null }
        })
    }
}