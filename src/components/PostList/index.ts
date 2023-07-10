import { Component, Input, OnInit } from "@angular/core";
import { APIService, IComment, IPost } from "src/services/APIService";
import { AppearanceService, IUISetting } from "src/services/AppearanceService";
import { IPostContentPayload } from "src/services/RemoteAPIBase";

@Component({
    selector: 'post-list',
    templateUrl: './index.html',
    styleUrls: ['./index.scss', './light.scss', './dark.scss']
})
export class PostList implements OnInit {
    @Input('posts') posts: IPost[]
    @Input('loading') loading: boolean
    @Input('displaySubreddit') displaySubreddit: boolean

    uiSetting: IUISetting

    displayPostDetail: boolean = false
    commentList: IComment[] = []
    openedPost: IPost
    postLoading: boolean = false

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

    openPost(permalink: string) {
        this.postLoading = true
        this.displayPostDetail = true
        let payload: IPostContentPayload = {
            permalink: permalink
        }
        this._api.getPostContent(payload).then((res) => {
            if (res) {
                this.openedPost = res.post
                this.commentList.push(...res.comments)
            }
        }).finally(() => {
            this.postLoading = false
        })
    }

    closePost() {
        this.displayPostDetail = false
        this.commentList = []
    }
}