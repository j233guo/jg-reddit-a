import {Component, effect, OnInit, ViewChild} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {PostList} from "../PostList";
import {APIService} from "src/services/APIService";
import {IPostListPayload, ListingOption} from "src/services/RemoteAPIBase";
import {AppearanceService, IUISetting} from "src/services/AppearanceService";
import {IPreferences, PreferenceService} from "src/services/PreferenceService";
import {MessageService} from "src/services/MessageService";
import {IPost} from "../../data/dataTypes";

@Component({
    selector: 'subreddit-page',
    templateUrl: './index.html',
    styleUrls: ['./index.scss']
})
export class SubredditPage implements OnInit {
    @ViewChild(PostList) postList: PostList

    uiSetting: IUISetting
    preferences: IPreferences

    subreddit: string | null
    posts: IPost[] = []
    postListLoading: boolean = false

    listingOption: ListingOption = 'hot'

    constructor(
        private _api: APIService,
        private _appearanceService: AppearanceService,
        private _preferenceService: PreferenceService,
        private _route: ActivatedRoute,
        private _messageService: MessageService
    ) {
        this.subreddit = this._route.snapshot.paramMap.get('sub')
        this.uiSetting = this._appearanceService.UISetting()
        effect(() => {
            this.uiSetting = this._appearanceService.UISetting()
        });
    }

    ngOnInit(): void {
        this.preferences = this._preferenceService.getPreferences
        this._preferenceService.observablePreferences.subscribe(this, (value) => {
            Object.entries(value).forEach(([key, val]) => {
                this.preferences[key] = val
            })
        })
        this._route.params.subscribe(param => {
            if (param["sub"] !== this.subreddit) {
                this.subreddit = param["sub"]
                this.posts = []
                this.loadPosts().then()
            }
        })
        this.loadPosts().then()
    }

    setListingOption(option: ListingOption) {
        if (option === this.listingOption) return
        this.listingOption = option
        this.posts = []
        this.loadPosts().then()
    }

    async loadPosts(after?: string | null) {
        let payload: IPostListPayload = {
            subreddit: this.subreddit ?? 'all',
            listingOption: this.listingOption,
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
