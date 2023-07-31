import { Component } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { debounceTime, distinctUntilChanged } from "rxjs";
import { APIService } from "src/services/APIService";
import { AppearanceService, IUISetting } from "src/services/AppearanceService";
import { ISubredditNamesPayload } from "src/services/RemoteAPIBase";
import { SiderService } from "src/services/SiderService";

@Component({
    selector: 'search-page',
    templateUrl: './index.html',
    styleUrls: ['./index.scss']
})
export class SearchPage {

    uiSetting: IUISetting

    includeNSFW: boolean = true
    loading: boolean = false
    names: string[] = []

    searchControl = new FormControl()

    constructor(
        private _appearanceService: AppearanceService,
        private _api: APIService,
        private _router: Router,
        private _siderService: SiderService,
    ) {}

    ngOnInit() {
        this.uiSetting = this._appearanceService.getUISetting
        this._appearanceService.observableUISetting.subscribe(this, (value) => {
            Object.entries(value).forEach(([key, val]) => {
                this.uiSetting[key] = val
            })
        })
        this.searchControl.valueChanges.pipe(
            debounceTime(1000), 
            distinctUntilChanged()
        ).subscribe((value) => {
            this.search(value)
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
        }).catch((err) => {

        }).finally(() => {
            this.loading = false
        })
    }

    goToSubreddit(name: string) {
        this._router.navigate(['/subreddit', name])
        this._siderService.collapse()
    }
}