import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/services/APIService';
import { AppearanceService, IUITheme } from 'src/services/AppearanceService';
import { LoadingService } from 'src/services/LoadingService';
import { MessageService } from 'src/services/MessageService';

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
        private _loadingService: LoadingService,
        private _message: MessageService,
        private _api: APIService
    ) {}

    async ngOnInit() {
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
        await this._api.checkEngineServer().then((res) => {
            if (!res) { this._message.error("Failed to connect to server.") }
        })
    }
}
