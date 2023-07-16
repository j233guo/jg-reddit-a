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
    @Output() load: EventEmitter<string> = new EventEmitter()

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

    loadMore() {
        const lastPostName = this.posts[this.posts.length - 1].name
        this.load.emit(lastPostName)
    }

    openPost(post: IPost) {
        this.openedPost = post
        this.loadComments()
    }

    loadComments() {
        this.commentsLoading = true
        this.displayPostDetail = true
        let payload: ICommentListPayload = {
            subreddit: this.openedPost.subreddit,
            id: this.openedPost.id,
            limit: 50,
            depth: 0,
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