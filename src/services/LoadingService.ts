import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

type LoadingParam = {
    status: boolean
    text: string
}

@Injectable()
export class LoadingService {
    private loadingState: BehaviorSubject<LoadingParam>

    constructor() {
        this.loadingState = new BehaviorSubject<LoadingParam>({ status: false, text: "" })
    }

    startLoading(text: string = "") {
        this.loadingState.next({ status: true, text: text })
    }

    finishLoading() {
        setTimeout(() => {
            this.loadingState.next({ status: false, text: "" })
        }, 100)
    }

    getLoadingState() {
        return this.loadingState
    }
}