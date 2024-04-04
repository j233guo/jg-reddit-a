import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { IComment, IPost } from "src/services/APIService";
import { AppearanceService, IUISetting } from "src/services/AppearanceService";

@Component({
    selector: 'post-page',
    templateUrl: './index.html',
    styleUrls: ['./index.scss'],
})
export class PostPage implements OnInit {
    @Input('loading') loading: boolean
    @Input('post') post: IPost
    @Input('comments') comments: IComment[]
    @Output('dismiss') dismiss: EventEmitter<any> = new EventEmitter()

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

    /**
     * Opens a provided URL in a new browser tab.
     * @param url The URL of the web page to be opened.
     */
    goToLink(url: string){
        window.open(url, "_blank")
    }

    /**
     * Closes the current post page modal
     */
    dismissModal() {
        this.dismiss.emit()
    }
}
