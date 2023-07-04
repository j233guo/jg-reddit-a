import { Component, OnInit } from '@angular/core';
import { FAV_SUBS, ISubredditNameDict } from 'src/data/FavouriteSubs';
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
    favouriteSubreddits: ISubredditNameDict[]

    loadingSpinningEffect: boolean
    loadingText: string = ""

    constructor(
        private _appearanceService: AppearanceService,
        private _loadingService: LoadingService,
        private _message: MessageService,
        private _api: APIService
    ) {
        this.favouriteSubreddits = FAV_SUBS
    }

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

        this._loadingService.startLoading()
        this._api.checkServer().then((res) => {
            if (!res) { this._message.error("Unable to access Reddit API because access token is unavailable.") }
        }).catch(() => {
            this._message.error("Failed to connect to server.")
        }).finally(() => {
            this._loadingService.finishLoading()
        })
    }
}
