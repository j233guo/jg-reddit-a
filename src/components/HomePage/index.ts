import { Component, OnInit } from "@angular/core";
import { APIService, IPost } from "src/services/APIService";
import { IPostListPayload } from "src/services/RemoteAPIBase";

@Component({
    selector: 'home-page',
    templateUrl: './index.html',
    styleUrls: ['./index.scss']
})
export class HomePage implements OnInit {

    posts: IPost[] = []
    postListLoading: boolean = false

    constructor(
        private _api: APIService
    ) {}
    
    ngOnInit(): void {
        this.loadPosts()
    }

    async loadPosts(after?: string) {
        let payload: IPostListPayload = {
            subreddit: 'all',
            listingOption: 'top',
            limit: 20
        }
        if (after) { payload['after'] = after }
        this.postListLoading = true
        this._api.getPosts(payload).then((res) => {
            this.posts.push(...res)
        }).catch((err) => {
            console.log(err)
        }).finally(() => {
            this.postListLoading = false
        })
    }
}