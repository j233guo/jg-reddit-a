import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class SideMenuService {

    private _isCollapsed = new BehaviorSubject<boolean>(false)
    public isCollapsed$ = this._isCollapsed.asObservable()

    constructor() {}

    collapse() {
        this._isCollapsed.next(true)
    }

    expand() {
        this._isCollapsed.next(false)
    }
}
