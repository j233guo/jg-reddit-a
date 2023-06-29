import { Component, OnInit } from "@angular/core";
import { APIService, IPost } from "src/services/APIService";
import { AppearanceService, IUISetting } from "src/services/AppearanceService";
import { IListingPayload } from "src/services/RemoteAPIBase";

@Component({
    selector: 'post-list',
    templateUrl: './index.html',
    styleUrls: ['./index.scss']
})
export class PostList implements OnInit {

    uiSetting: IUISetting
    posts: IPost[] = []

    constructor(
        private _api: APIService,
        private _appearanceService: AppearanceService,
    ) {}

    ngOnInit(): void {
        this.uiSetting = this._appearanceService.getUISetting
        this._appearanceService.observableUISetting.subscribe(this, (value) => {
            Object.entries(value).forEach(([key, val]) => {
                this.uiSetting[key] = val
            })
        })
        this.loadPosts()
    }

    async loadPosts() {
        let payload: IListingPayload = {
            subreddit: 'all',
            listingOption: 'top',
            limit: 20
        }
        let fetchedPosts = await this._api.getPostListing(payload)
        this.posts.push(...fetchedPosts)
    }
}