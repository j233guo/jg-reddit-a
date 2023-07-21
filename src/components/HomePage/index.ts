import { Component, OnInit } from "@angular/core";
import { APIService, IPost } from "src/services/APIService";
import { AppearanceService, IUISetting } from "src/services/AppearanceService";
import { IPreferences, PreferenceService } from "src/services/PreferenceService";
import { IPostListPayload } from "src/services/RemoteAPIBase";

@Component({
    selector: 'home-page',
    templateUrl: './index.html',
    styleUrls: ['./index.scss']
})
export class HomePage implements OnInit {

    uiSetting: IUISetting
    preferences: IPreferences

    posts: IPost[] = []
    postListLoading: boolean = false

    constructor(
        private _api: APIService,
        private _appearanceService: AppearanceService,
        private _preferenceService: PreferenceService,
    ) {}
    
    ngOnInit(): void {
        this.uiSetting = this._appearanceService.getUISetting
        this._appearanceService.observableUISetting.subscribe(this, (value) => {
            Object.entries(value).forEach(([key, val]) => {
                this.uiSetting[key] = val
            })
        })
        this.preferences = this._preferenceService.getPreferences
        this._preferenceService.observablePreferences.subscribe(this, (value) => {
            Object.entries(value).forEach(([key, val]) => {
                this.preferences[key] = val
            })
        })
        this.loadPosts()
    }

    async loadPosts(after?: string) {
        let payload: IPostListPayload = {
            subreddit: 'all',
            listingOption: 'top',
            limit: this.preferences.postsPerLoad
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