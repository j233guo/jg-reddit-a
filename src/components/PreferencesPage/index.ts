import { Component, OnInit } from "@angular/core";
import { AppearanceService, IUISetting } from "src/services/AppearanceService";
import { IPreferences, PreferenceService } from "src/services/PreferenceService";

@Component({
    selector: 'preferences-page',
    templateUrl: './index.html',
    styleUrls: ['./index.scss']
})
export class PreferencesPage implements OnInit {

    uiSetting: IUISetting
    preferences: IPreferences

    constructor(
        private _appearanceService: AppearanceService,
        private _preferenceService: PreferenceService
    ) {}

    ngOnInit(): void {
        this.uiSetting = this._appearanceService.getUISetting
        this._appearanceService.observableUISetting.subscribe(this, (value) => {
            Object.entries(value).forEach(([key, val]) => {
                this.uiSetting[key] = val
            })
        })
        this.preferences = this._preferenceService.getPreferences
        this._preferenceService.observablePreferences.subscribe(this, (value) => {
            Object.entries(value).forEach(([key, val]) => {
                this.preferences[key] = val
            })
        })
    }

    applyUITheme() {
        this._appearanceService.applyUISetting(this.uiSetting)
    }

    applyPreferences() {
        this._preferenceService.applyPreferences(this.preferences)
    }
}