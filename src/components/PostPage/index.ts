import {Component, effect, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {IComment, IPost} from "../../data/models";
import {IUISetting, UIControlService} from "../../services/UIControlService";

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
        private _uiControl: UIControlService,
    ) {
        this.uiSetting = this._uiControl.getUISetting()
        effect(() => {
            this.uiSetting = this._uiControl.getUISetting()
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
