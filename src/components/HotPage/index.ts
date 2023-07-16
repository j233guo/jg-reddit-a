import { Component, OnInit } from "@angular/core";
import { APIService, IPost } from "src/services/APIService";
import { AppearanceService, IUISetting } from "src/services/AppearanceService";
import { IPostListPayload } from "src/services/RemoteAPIBase";

@Component({
    selector: 'hot-page',
    templateUrl: './index.html',
    styleUrls: ['./index.scss']
})
export class HotPage implements OnInit {

    uiSetting: IUISetting

    posts: IPost[] = []
    postListLoading: boolean = false

    constructor(
        private _api: APIService,
        private _appearanceService: AppearanceService
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

    async loadPosts(after?: string) {
        let payload: IPostListPayload = {
            subreddit: 'all',
            listingOption: 'hot',
            limit: 20,
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