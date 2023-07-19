import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { TrackableSubjectWrapper } from "src/lib/TrackableObservable";
import { RecursiveReadonly } from "src/lib/tslang";

export type ColorMode = 'light' | 'dark'

export interface IUISetting {
    colorMode: ColorMode
}

type SubjectUIuiSetting = TrackableSubjectWrapper<RecursiveReadonly<Partial<IUISetting>>, Subject<RecursiveReadonly<Partial<IUISetting>>>>

@Injectable({
    providedIn: 'root'
})
export class AppearanceService {

    private _uiSetting: IUISetting

    private _subjectUISetting: SubjectUIuiSetting

    get observableUISetting() { return this._subjectUISetting.observable }

    get getUISetting() { return this._uiSetting }

    constructor() {
        this._subjectUISetting = new TrackableSubjectWrapper(new Subject())
        this.initUISetting()
    }

    initUISetting() {
        this._uiSetting = {
            colorMode: 'dark'
        }
    }

    applyUISetting(value: Partial<IUISetting>) {
        let pass: Partial<IUISetting> = {}
        Object.entries(value).forEach(([key, val]) => {
            this._uiSetting[key] = val
            pass[key] = val
        })
        this._subjectUISetting.subject.next(pass)
    }
}