import {Component, effect, OnInit} from "@angular/core";
import {APIService} from "src/services/APIService";
import {MessageService} from "src/services/MessageService";
import {IPreferences, PreferenceService} from "src/services/PreferenceService";
import {IPostListPayload} from "src/services/RemoteAPIBase";
import {IPost} from "../../data/models";
import {IUISetting, UIControlService} from "../../services/UIControlService";

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
        private _uiControl: UIControlService,
        private _api: APIService,
        private _preferenceService: PreferenceService,
        private _messageService: MessageService,
    ) {
        this.uiSetting = this._uiControl.getUISetting()
        effect(() => {
            this.uiSetting = this._uiControl.getUISetting()
        });
    }

    ngOnInit(): void {
        this.preferences = this._preferenceService.getPreferences
        this._preferenceService.observablePreferences.subscribe(this, (value) => {
            Object.entries(value).forEach(([key, val]) => {
                this.preferences[key] = val
            })
        })
        this.loadPosts().then(() => {})
    }

    async loadPosts(after?: string | null) {
        let payload: IPostListPayload = {
            subreddit: 'all',
            listingOption: 'top',
            limit: this.preferences.postsPerLoad
        }
        if (after) { payload['after'] = after }
        this.postListLoading = true
        this._api.getPosts(payload).then((res) => {
            this.posts.push(...res)
        }).catch(() => {
            this._messageService.error("Failed to load posts.")
        }).finally(() => {
            this.postListLoading = false
        })
    }
}
