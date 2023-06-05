import { Component, OnInit } from '@angular/core';
import { AppearanceService, IUITheme } from 'src/services/AppearanceService';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    uiTheme: IUITheme

    siderCollapsed: boolean = false

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
