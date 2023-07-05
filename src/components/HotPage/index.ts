import { Component, OnInit } from "@angular/core";
import { IListingPayload } from "src/services/RemoteAPIBase";
import { APIService, IPost } from "src/services/APIService";

@Component({
    selector: 'hot-page',
    templateUrl: './index.html',
    styleUrls: ['./index.scss']
})
export class HotPage implements OnInit {

    posts: IPost[] = []
    postListLoading: boolean = false

    constructor(
        private _api: APIService
    ) {}
    
    ngOnInit(): void {
        this.loadPosts()
    }

    async loadPosts() {
        let payload: IListingPayload = {
            subreddit: 'all',
            listingOption: 'hot',
            limit: 20
        }
        this.postListLoading = true
        this._api.getPostListing(payload).then((res) => {
            this.posts.push(...res)
        }).catch((err) => {
            console.log(err)
        }).finally(() => {
            this.postListLoading = false
        })
    }
}