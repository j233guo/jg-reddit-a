import {Component, effect, OnInit, ViewChild} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {PostList} from "../PostList";
import {APIService} from "src/services/APIService";
import {IPostListPayload, ListingOption} from "src/services/RemoteAPIBase";
import {IPreferences, PreferenceService} from "src/services/PreferenceService";
import {MessageService} from "src/services/MessageService";
import {IPost, ISubreddit} from "../../data/models";
import {IUISetting, UIControlService} from "../../services/UIControlService";
import {SubredditService} from "../../services/SubredditService";

@Component({
    selector: 'subreddit-page',
    templateUrl: './index.html',
    styleUrls: ['./index.scss']
})
export class SubredditPage implements OnInit {
    @ViewChild(PostList) postList: PostList

    uiSetting: IUISetting
    preferences: IPreferences

    favoriteSubreddits: ISubreddit[] = []
    isFavorite: boolean = false

    subreddit: string | null
    posts: IPost[] = []
    postListLoading: boolean = false

    listingOption: ListingOption = 'hot'

    constructor(
        private _uiControl: UIControlService,
        private _api: APIService,
        private _preferenceService: PreferenceService,
        private _route: ActivatedRoute,
        private _messageService: MessageService,
        private _subredditService: SubredditService,
    ) {
        this.subreddit = this._route.snapshot.paramMap.get('sub')
        this.uiSetting = this._uiControl.getUISetting()
        effect(() => {
            this.uiSetting = this._uiControl.getUISetting()
        })
        this.favoriteSubreddits = this._subredditService.getFavoriteSubreddits()
        effect(() => {
            this.favoriteSubreddits = this._subredditService.getFavoriteSubreddits()
            this.evaluateFavorite()
        })
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
                this.evaluateFavorite()
                this.posts = []
                this.loadPosts().then()
            }
        })
        this.loadPosts().then()
        this._subredditService.addRecentSubreddit({
            name: this.subreddit ?? ""
        })
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

    evaluateFavorite() {
        this.isFavorite = this.favoriteSubreddits.filter((sub) => {
            return sub.name === this.subreddit
        }).length !== 0
    }

    saveFavorite() {
        if (!this.subreddit) return
        this._subredditService.addFavoriteSubreddit({
            name: this.subreddit
        })
        this._messageService.success(`r/${this.subreddit} added to favorites`)
    }

    removeFavorite() {
        if (!this.subreddit) return
        this._subredditService.removeFavoriteSubreddit(this.subreddit)
        this._messageService.success(`r/${this.subreddit} removed from favorites`)
    }
}
