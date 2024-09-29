import {Component, effect, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {APIService} from 'src/services/APIService';
import {MessageService} from 'src/services/MessageService';
import {IUISetting, UIControlService} from "../services/UIControlService";
import {SubredditService} from "../services/SubredditService";
import {ISubreddit} from "../data/models";

@Component({
    selector: 'app-component',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    uiSetting: IUISetting
    sideMenuCollapsed: boolean = false
    favouriteSubreddits: ISubreddit[]
    recentSubreddits: ISubreddit[] = []

    loadingSpinningEffect: boolean
    loadingText: string = ""

    constructor(
        private _uiControl: UIControlService,
        private _message: MessageService,
        private _api: APIService,
        private _router: Router,
        private _subredditService: SubredditService,
    ) {
        this.uiSetting = this._uiControl.getUISetting()
        this.sideMenuCollapsed = this._uiControl.getSideMenuCollapsed()
        this.favouriteSubreddits = this._subredditService.getFavoriteSubreddits()
        this.recentSubreddits = this._subredditService.getRecentSubreddits()
        effect(() => {
            this.uiSetting = this._uiControl.getUISetting()
            this.sideMenuCollapsed = this._uiControl.getSideMenuCollapsed()
            this.favouriteSubreddits = this._subredditService.getFavoriteSubreddits()
            this.recentSubreddits = this._subredditService.getRecentSubreddits()
        })
    }

    async ngOnInit() {
        this._uiControl.LoadingState.subscribe((value) => {
            this.loadingSpinningEffect = value.status
            this.loadingText = value.text
        })
        this._uiControl.startLoading()
        this._api.checkServer().then((res) => {
            if (!res) { this._message.error("Unable to access Reddit API because access token is unavailable.") }
        }).catch(() => {
            this._message.error("Failed to connect to server.")
        }).finally(() => {
            this._uiControl.finishLoading()
        })
    }

    /**
     * Toggles the state of the sider (sidebar) collapse.
     */
    toggleSideMenuCollapse() {
        this.sideMenuCollapsed ? this._uiControl.expandSideMenu() : this._uiControl.collapseSideMenu()
    }

    goToHome() {
        this._router.navigate(['/']).then()
        this._uiControl.expandSideMenu()
    }

    goToSearch() {
        this._router.navigate(['/search']).then()
        this._uiControl.collapseSideMenu()
    }
}
