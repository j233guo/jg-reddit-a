import { Component, effect, Input } from "@angular/core";
import { IComment } from "src/data/models";
import { IUISetting, UIControlService } from "src/services/UIControlService";

@Component({
    selector: "comment-cell",
    templateUrl: "./index.html",
    styleUrls: ["./index.scss"]
})
export class CommentCell {
    @Input() comment: IComment

    uiSetting: IUISetting

    constructor(
        private _uiControl: UIControlService,
    ) {
        this.uiSetting = this._uiControl.getUISetting()
        effect(() => {
            this.uiSetting = this._uiControl.getUISetting()
        });
    }

    ngOnInit() {}
}
