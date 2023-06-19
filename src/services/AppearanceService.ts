import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { TrackableSubjectWrapper } from "src/lib/TrackableObservable";
import { RecursiveReadonly } from "src/lib/tslang";

export type UITheme = 'light' | 'dark'

export interface IUITheme {
    theme: UITheme
}

type SubjectUITheme = TrackableSubjectWrapper<RecursiveReadonly<Partial<IUITheme>>, Subject<RecursiveReadonly<Partial<IUITheme>>>>

@Injectable({
    providedIn: 'root'
})
export class AppearanceService {

    private _theme: IUITheme

    private _subjectUITheme: SubjectUITheme

    get observableUITheme() { return this._subjectUITheme.observable }

    get getUITheme() { return this._theme }

    constructor() {
        this._subjectUITheme = new TrackableSubjectWrapper(new Subject())
        this._theme = { theme: 'dark' }
    }

    setUITheme(value: IUITheme) {
        this._theme = value
        this._subjectUITheme.subject.next(value)
    }
}