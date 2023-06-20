import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/services/APIService';
import { AppearanceService, IUISetting } from 'src/services/AppearanceService';
import { LoadingService } from 'src/services/LoadingService';
import { MessageService } from 'src/services/MessageService';

@Component({
    selector: 'app-component',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    uiSetting: IUISetting
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
        this.uiSetting = this._appearanceService.getUISetting
        this._appearanceService.observableUISetting.subscribe(this, (value) => {
            Object.entries(value).forEach(([key, val]) => {
                this.uiSetting[key] = val
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
