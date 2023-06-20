import { Component, OnInit } from "@angular/core";
import { AppearanceService, IUITheme } from "src/services/AppearanceService";

@Component({
    selector: 'preferences-page',
    templateUrl: './index.html',
    styleUrls: ['./index.scss']
})
export class PreferencesPage implements OnInit {

    uiTheme: IUITheme

    constructor(
        private _appearanceService: AppearanceService
    ) {}

    ngOnInit(): void {
        this.uiTheme = this._appearanceService.getUITheme
        this._appearanceService.observableUITheme.subscribe(this, (value) => {
            Object.entries(value).forEach(([key, val]) => {
                this.uiTheme[key] = val
            })
        })
    }
}