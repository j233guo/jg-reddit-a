import { Component, OnInit } from "@angular/core";
import { AppearanceService, IUISetting } from "src/services/AppearanceService";

@Component({
    selector: 'preferences-page',
    templateUrl: './index.html',
    styleUrls: ['./index.scss']
})
export class PreferencesPage implements OnInit {

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

    applyUITheme() {
        this._appearanceService.applyUISetting(this.uiSetting)
    }
}