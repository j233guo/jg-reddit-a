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
    @Input() depth: number = 0
    @Input() parentBorderColor?: string;

    uiSetting: IUISetting
    borderColor: string

    constructor(
        private _uiControl: UIControlService,
    ) {
        this.uiSetting = this._uiControl.getUISetting()
        effect(() => {
            this.uiSetting = this._uiControl.getUISetting()
        });
        this.borderColor = this.getRandomColor()
    }

    ngOnInit() {}

    private getRandomColor(): string {
        const colors = [
            '#FF4500',  // Reddit Orange
            '#0079D3',  // Reddit Blue
            '#46D160',  // Reddit Green
            '#7193FF',  // Light Blue
            '#FF4599',  // Pink
            '#FFB000',  // Gold
            '#9B84EC',  // Purple
            '#FF6B33',  // Coral
        ];
        const availableColors = this.parentBorderColor ? 
            colors.filter(color => color !== this.parentBorderColor) : 
            colors;
        return availableColors[Math.floor(Math.random() * availableColors.length)];
    }
}
