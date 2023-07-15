import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PostList } from "../PostList";
import { APIService, IPost } from "src/services/APIService";
import { IPostListPayload } from "src/services/RemoteAPIBase";
import { AppearanceService, IUISetting } from "src/services/AppearanceService";

@Component({
    selector: 'subreddit-page',
    templateUrl: './index.html',
    styleUrls: ['./index.scss']
})
export class SubredditPage implements OnInit {
    @ViewChild(PostList) postlist: PostList

    uiSetting: IUISetting

    subreddit: string | null
    posts: IPost[] = []
    postListLoading: boolean = false

    constructor(
        private _api: APIService,
        private _appearanceService: AppearanceService,
        private _route: ActivatedRoute,
    ) {
        this.subreddit = this._route.snapshot.paramMap.get('sub')
    }
    
    ngOnInit(): void {
        this.uiSetting = this._appearanceService.getUISetting
        this._appearanceService.observableUISetting.subscribe(this, (value) => {
            Object.entries(value).forEach(([key, val]) => {
                this.uiSetting[key] = val
            })
        })
        this.loadPosts()
        this._route.params.subscribe(param => {
            if (param["sub"] !== this.subreddit) {
                this.subreddit = param["sub"]
                this.posts = []
                this.loadPosts()
            }
        })
    }

    async loadPosts(after?: string) {
        let payload: IPostListPayload = {
            subreddit: this.subreddit ?? 'all',
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