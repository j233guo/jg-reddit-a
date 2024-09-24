import {Component, effect, OnInit} from "@angular/core";
import {FormControl} from "@angular/forms";
import {Router} from "@angular/router";
import {debounceTime, distinctUntilChanged} from "rxjs";
import {APIService} from "src/services/APIService";
import {ISubredditNamesPayload} from "src/services/RemoteAPIBase";
import {IUISetting, UIControlService} from "../../services/UIControlService";

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
        private _uiControl: UIControlService,
        private _api: APIService,
        private _router: Router,
    ) {
        this.uiSetting = this._uiControl.UISetting()
        effect(() => {
            this.uiSetting = this._uiControl.UISetting()
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
            this._uiControl.collapseSideMenu()
        })
    }
}
