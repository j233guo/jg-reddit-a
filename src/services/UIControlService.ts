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
    /**
     * Retrieves the current UI settings
     * @returns A readonly signal containing the current UI settings
     */
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
    /**
     * Starts the loading state with the provided text
     * @param text The text to display while loading (default is an empty string)
     */
    startLoading(text: string = "") {
        this.loadingState.next({ status: true, text: text })
    }

    /**
     * Finishes the loading state
     */
    finishLoading() {
        setTimeout(() => {
            this.loadingState.next({ status: false, text: "" })
        }, 100)
    }

    /**
     * Retrieves the loading state
     * @returns The loading state as a BehaviorSubject
     */
    get LoadingState() {
        return this.loadingState
    }

    // side menu functions
    /**
     * Retrieves the collapsed state of the side menu
     * @returns A readonly signal containing the collapsed state of the side menu
     */
    get getSideMenuCollapsed() {
        return this.sideMenuCollapsed.asReadonly()
    }

    /**
     * Collapses the side menu
     */
    collapseSideMenu() {
        this.sideMenuCollapsed.set(true)
    }

    /**
     * Expands the side menu
     */
    expandSideMenu() {
        this.sideMenuCollapsed.set(false)
    }
}
