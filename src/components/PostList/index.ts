import { Component, Input, OnInit } from "@angular/core";
import { APIService, IPost } from "src/services/APIService";
import { AppearanceService, IUISetting } from "src/services/AppearanceService";

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
}