import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FAVOURITE_SUBS, ISubredditNameDict } from 'src/data/FavouriteSubs';
import { APIService } from 'src/services/APIService';
import { AppearanceService, IUISetting } from 'src/services/AppearanceService';
import { LoadingService } from 'src/services/LoadingService';
import { MessageService } from 'src/services/MessageService';
import { SideMenuService } from 'src/services/SideMenuService';

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
        private _api: APIService,
        private _sideMenuService: SideMenuService,
        private _router: Router
    ) {
        this.favouriteSubreddits = FAVOURITE_SUBS
        this.uiSetting = this._appearanceService.getUISetting
    }

    async ngOnInit() {
        this._sideMenuService.isCollapsed$.subscribe((collapsed) => {
            this.siderCollapsed = collapsed
        })
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

    /**
     * Toggles the state of the sider (sidebar) collapse.
     */
    toggleSideMenuCollapse() {
        this.siderCollapsed ? this._sideMenuService.expand() : this._sideMenuService.collapse()
    }

    goToHome() {
        this._router.navigate(['/'])
        this._sideMenuService.expand()
    }

    goToSearch() {
        this._router.navigate(['/search'])
        this._sideMenuService.collapse()
    }
}
