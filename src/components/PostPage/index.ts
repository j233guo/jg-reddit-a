import {Component, effect, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {AppearanceService, IUISetting} from "src/services/AppearanceService";
import {IComment, IPost} from "../../data/dataTypes";

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
    ) {
        this.uiSetting = this._appearanceService.UISetting()
        effect(() => {
            this.uiSetting = this._appearanceService.UISetting()
        });
    }

    ngOnInit(): void {}

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
