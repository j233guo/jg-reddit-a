import {Component, effect, OnInit} from "@angular/core";
import { FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { debounceTime, distinctUntilChanged } from "rxjs";
import { APIService } from "src/services/APIService";
import { AppearanceService, IUISetting } from "src/services/AppearanceService";
import { ISubredditNamesPayload } from "src/services/RemoteAPIBase";
import { SideMenuService } from "src/services/SideMenuService";

@Component({
    selector: 'search-page',
    templateUrl: './index.html',
    styleUrls: ['./index.scss']
})
export class SearchPage implements OnInit {

    uiSetting: IUISetting

    loading: boolean = false
    names: string[] = []

    searchControl = new FormControl()
    constructor(
        private _appearanceService: AppearanceService,
        private _api: APIService,
        private _router: Router,
        private _sideMenuService: SideMenuService,
    ) {
        this.uiSetting = this._appearanceService.UISetting()
        effect(() => {
            this.uiSetting = this._appearanceService.UISetting()
        });
    }

    ngOnInit() {
        this.searchControl.valueChanges.pipe(
            debounceTime(1000),
            distinctUntilChanged()
        ).subscribe((value) => {
            this.search(value).then(() => {})
        })
    }

    async search(query: string) {
        this.names = []
        this.loading = true
        let payload: ISubredditNamesPayload = {
            query: query,
            include_over_18: true,
        }
        this._api.getSubredditNames(payload).then((res) => {
            if (res) { this.names = res }
        }).catch(() => {

        }).finally(() => {
            this.loading = false
        })
    }

    goToSubreddit(name: string) {
        this._router.navigate(['/subreddit', name]).then(() => {
            this._sideMenuService.collapse()
        })
    }
}
