import {Injectable, signal, WritableSignal} from "@angular/core";

export type ColorMode = 'light' | 'dark'

export interface IUISetting {
    colorMode: ColorMode
}

@Injectable({
    providedIn: 'root'
})
export class AppearanceService {

    private uiSetting: WritableSignal<IUISetting> = signal<IUISetting>({colorMode: 'light'})

    get UISetting() {
        return this.uiSetting.asReadonly()
    }

    constructor() {}

    applyUISetting(value: Partial<IUISetting>) {
        let updatedSetting: IUISetting = {
            ...this.uiSetting(),
            ...value
        }
        this.uiSetting.set(updatedSetting)
    }
}
