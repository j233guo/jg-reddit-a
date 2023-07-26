import { Component } from "@angular/core";
import { AppearanceService, IUISetting } from "src/services/AppearanceService";

@Component({
    selector: 'search-page',
    templateUrl: './index.html',
    styleUrls: ['./index.scss']
})
export class SearchPage {

    uiSetting: IUISetting

    searchQuery: string = ""
    includeNSFW: boolean = true

    constructor(
        private _appearanceService: AppearanceService
    ) {}

    ngOnInit() {
        this.uiSetting = this._appearanceService.getUISetting
        this._appearanceService.observableUISetting.subscribe(this, (value) => {
            Object.entries(value).forEach(([key, val]) => {
                this.uiSetting[key] = val
            })
        })
    }
}