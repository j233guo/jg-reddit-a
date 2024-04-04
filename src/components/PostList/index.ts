import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { APIService, IComment, IPost } from "src/services/APIService";
import { AppearanceService, IUISetting } from "src/services/AppearanceService";
import { MessageService } from "src/services/MessageService";
import { ICommentListPayload } from "src/services/RemoteAPIBase";
import { SideMenuService } from "src/services/SideMenuService";

@Component({
    selector: 'post-list',
    templateUrl: './index.html',
    styleUrls: ['./index.scss']
})
export class PostList implements OnInit {
    @Input('posts') posts: IPost[]
    @Input('loading') loading: boolean
    @Input('displaySubreddit') displaySubreddit: boolean
    @Output() load: EventEmitter<string | null> = new EventEmitter()

    uiSetting: IUISetting

    displayPostDetail: boolean = false
    commentList: IComment[] = []
    openedPost: IPost
    commentsLoading: boolean = false

    constructor(
        private _api: APIService,
        private _appearanceService: AppearanceService,
        private _router: Router,
        private _sideMenuService: SideMenuService,
        private _messageService: MessageService,
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
        const lastPostName = this.posts && this.posts.length > 0 ? this.posts[this.posts.length - 1].name : null
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
        }).catch(() => {
            this._messageService.error("Failed to load comments.")
        }).finally(() => {
            this.commentsLoading = false
        })
    }

    closePost() {
        this.displayPostDetail = false
        this.commentList = []
    }

    /**
     * This function is called when an error occurs while loading the thumbnail image.
     * By setting the style of the 'target' to 'display: none', the thumbnail image is effectively hidden when it fails to load.
     * @param event error event
     */
    onThumbnailError(event) {
        event.target.style.display = 'none'
    }

    goToSubreddit(subreddit: string) {
        this._router.navigate(['/subreddit', subreddit]).then(() => {
            this._sideMenuService.collapse()
        })
    }
}
