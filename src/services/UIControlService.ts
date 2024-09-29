import {Injectable, signal, WritableSignal} from "@angular/core";
import {BehaviorSubject} from "rxjs";

type LoadingState = {
    status: boolean
    text: string
}

export type ColorMode = 'light' | 'dark'

export interface IUISetting {
    colorMode: ColorMode
}

@Injectable({
    providedIn: 'root'
})
export class UIControlService {
    private readonly uiSetting: WritableSignal<IUISetting>
    private readonly loadingState: BehaviorSubject<LoadingState>
    private readonly sideMenuCollapsed: WritableSignal<boolean>

    constructor() {
        this.uiSetting = signal<IUISetting>({colorMode: 'light'})
        this.loadingState = new BehaviorSubject<LoadingState>({ status: false, text: "" })
        this.sideMenuCollapsed = signal(false)
    }

    // UI Setting functions
    get getUISetting() {
        return this.uiSetting.asReadonly()
    }

    applyUISetting(value: Partial<IUISetting>) {
        let updatedSetting: IUISetting = {
            ...this.uiSetting(),
            ...value
        }
        this.uiSetting.set(updatedSetting)
    }

    // Loading Functions
    startLoading(text: string = "") {
        this.loadingState.next({ status: true, text: text })
    }

    finishLoading() {
        setTimeout(() => {
            this.loadingState.next({ status: false, text: "" })
        }, 100)
    }

    get LoadingState() {
        return this.loadingState
    }

    // side menu functions
    get getSideMenuCollapsed() {
        return this.sideMenuCollapsed.asReadonly()
    }

    collapseSideMenu() {
        this.sideMenuCollapsed.set(true)
    }

    expandSideMenu() {
        this.sideMenuCollapsed.set(false)
    }
}
