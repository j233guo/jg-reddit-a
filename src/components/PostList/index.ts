import { Component, Input, OnInit } from "@angular/core";
import { APIService, IPost } from "src/services/APIService";
import { AppearanceService, IUISetting } from "src/services/AppearanceService";
import { IListingPayload } from "src/services/RemoteAPIBase";

@Component({
    selector: 'post-list',
    templateUrl: './index.html',
    styleUrls: ['./index.scss', './light.scss', './dark.scss']
})
export class PostList implements OnInit {
    @Input('subreddit') subreddit: string | null
    @Input('sort') sort: string

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
    }

    async loadPosts(clear = false) {
        if (clear) { this.posts = [] }
        let payload: IListingPayload = {
            subreddit: this.subreddit ?? 'all',
            listingOption: this.sort,
            limit: 20
        }
        let fetchedPosts = await this._api.getPostListing(payload)
        this.posts.push(...fetchedPosts)
    }
}