import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { APIService, IComment, IPost } from "src/services/APIService";
import { AppearanceService, IUISetting } from "src/services/AppearanceService";
import { ICommentListPayload } from "src/services/RemoteAPIBase";

@Component({
    selector: 'post-list',
    templateUrl: './index.html',
    styleUrls: ['./index.scss']
})
export class PostList implements OnInit {
    @Input('posts') posts: IPost[]
    @Input('loading') loading: boolean
    @Input('displaySubreddit') displaySubreddit: boolean

    uiSetting: IUISetting

    displayPostDetail: boolean = false
    commentList: IComment[] = []
    openedPost: IPost
    commentsLoading: boolean = false

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

    openPost(post: IPost) {
        this.openedPost = post
        this.commentsLoading = true
        this.displayPostDetail = true
        let payload: ICommentListPayload = {
            subreddit: this.openedPost.subreddit,
            id: this.openedPost.id,
            limit: 10,
        }
        this._api.getComments(payload).then((res) => {
            this.commentList.push(...res)
        }).catch((err) => {
            console.log(err)
        }).finally(() => {
            this.commentsLoading = false
        })
    }

    closePost() {
        this.displayPostDetail = false
        this.commentList = []
    }
}