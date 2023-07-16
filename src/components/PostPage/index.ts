import { Component, Input, OnInit } from "@angular/core";
import { IComment, IPost } from "src/services/APIService";
import { AppearanceService, IUISetting } from "src/services/AppearanceService";

@Component({
    selector: 'post-page',
    templateUrl: './index.html',
    styleUrls: ['./index.scss']
})
export class PostPage implements OnInit {
    @Input('loading') loading: boolean
    @Input('post') post: IPost
    @Input('comments') comments: IComment[]

    uiSetting: IUISetting

    constructor(
        private _appearanceService: AppearanceService
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