import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PostList } from "../PostList";
import { APIService, IPost } from "src/services/APIService";
import { IPostListPayload } from "src/services/RemoteAPIBase";

@Component({
    selector: 'subreddit-page',
    templateUrl: './index.html',
    styleUrls: ['./index.scss']
})
export class SubredditPage implements OnInit {
    @ViewChild(PostList) postlist: PostList

    subreddit: string | null
    posts: IPost[] = []
    postListLoading: boolean = false

    constructor(
        private _api: APIService,
        private route: ActivatedRoute,
    ) {
        this.subreddit = this.route.snapshot.paramMap.get('sub')
    }
    
    ngOnInit(): void {
        this.loadPosts()
        this.route.params.subscribe(param => {
            if (param["sub"] !== this.subreddit) {
                this.subreddit = param["sub"]
                this.loadPosts(true)
            }
        })
    }

    async loadPosts(clear = false) {
        if (clear) { this.posts = [] }
        let payload: IPostListPayload = {
            subreddit: this.subreddit ?? 'all',
            listingOption: 'top',
            limit: 20
        }
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