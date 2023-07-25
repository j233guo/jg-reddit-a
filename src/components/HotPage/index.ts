import { Component, OnInit } from "@angular/core";
import { APIService, IPost } from "src/services/APIService";
import { AppearanceService, IUISetting } from "src/services/AppearanceService";
import { MessageService } from "src/services/MessageService";
import { IPreferences, PreferenceService } from "src/services/PreferenceService";
import { IPostListPayload } from "src/services/RemoteAPIBase";

@Component({
    selector: 'hot-page',
    templateUrl: './index.html',
    styleUrls: ['./index.scss']
})
export class HotPage implements OnInit {

    uiSetting: IUISetting
    preferences: IPreferences

    posts: IPost[] = []
    postListLoading: boolean = false

    constructor(
        private _api: APIService,
        private _appearanceService: AppearanceService,
        private _preferenceService: PreferenceService,
        private _messageService: MessageService,
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

    async loadPosts(after?: string | null) {
        let payload: IPostListPayload = {
            subreddit: 'all',
            listingOption: 'hot',
            limit: this.preferences.postsPerLoad
        }
        if (after) { payload['after'] = after }
        this.postListLoading = true
        this._api.getPosts(payload).then((res) => {
            this.posts.push(...res)
        }).catch((err) => {
            this._messageService.error("Failed to load posts.")
        }).finally(() => {
            this.postListLoading = false
        })
    }
}