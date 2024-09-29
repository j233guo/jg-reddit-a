import {Component, effect, OnInit} from "@angular/core";
import {IPreferences, PreferenceService} from "src/services/PreferenceService";
import {IUISetting, UIControlService} from "../../services/UIControlService";

@Component({
    selector: 'preferences-page',
    templateUrl: './index.html',
    styleUrls: ['./index.scss']
})
export class PreferencesPage implements OnInit {

    uiSetting: IUISetting
    preferences: IPreferences

    constructor(
        private _uiControl: UIControlService,
        private _preferenceService: PreferenceService
    ) {
        this.uiSetting = this._uiControl.getUISetting()
        effect(() => {
            this.uiSetting = this._uiControl.getUISetting()
        });
    }

    ngOnInit(): void {
        this.preferences = this._preferenceService.getPreferences
        this._preferenceService.observablePreferences.subscribe(this, (value) => {
            Object.entries(value).forEach(([key, val]) => {
                this.preferences[key] = val
            })
        })
    }

    applyUITheme() {
        this._uiControl.applyUISetting(this.uiSetting)
    }

    applyPreferences() {
        this._preferenceService.applyPreferences(this.preferences)
    }
}
