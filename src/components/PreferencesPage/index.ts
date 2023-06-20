import { Component, OnInit } from "@angular/core";
import { AppearanceService, IUITheme } from "src/services/AppearanceService";

interface IPrefItem {
    title: string
    type: 'select'
    options?: any
    helpText: string
}

@Component({
    selector: 'preferences-page',
    templateUrl: './index.html',
    styleUrls: ['./index.scss']
})
export class PreferencesPage implements OnInit {

    uiTheme: IUITheme
    prefItems: IPrefItem[] = [
        {
            title: "Color Theme",
            type: "select",
            options: [
                { label: 'Light', value: 'light' },
                { label: 'Dark', value: 'dark' }
            ],
            helpText: ""
        },
    ]

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