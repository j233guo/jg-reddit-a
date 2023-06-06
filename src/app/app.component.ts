import { Component, OnInit } from '@angular/core';
import { AppearanceService, IUITheme } from 'src/services/AppearanceService';
import { LoadingService } from 'src/services/LoadingService';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    uiTheme: IUITheme
    siderCollapsed: boolean = false
    loadingSpinningEffect: boolean
    loadingText: string = ""

    constructor(
        private _appearanceService: AppearanceService,
        private _loadingService: LoadingService
    ) {}

    ngOnInit(): void {
        this.uiTheme = this._appearanceService.getUITheme
        this._appearanceService.observableUITheme.subscribe(this, (value) => {
            Object.entries(value).forEach(([key, val]) => {
                this.uiTheme[key] = val
            })
        })
        this._loadingService.getLoadingState().subscribe((value) => {
            this.loadingSpinningEffect = value.status
            this.loadingText = value.text
        })
    }
}
