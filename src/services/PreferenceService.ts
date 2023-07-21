import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { TrackableSubjectWrapper } from "src/lib/TrackableObservable";
import { RecursiveReadonly } from "src/lib/tslang";

export interface IPreferences {
    postsPerLoad: number
}

type SubjectPreferences = TrackableSubjectWrapper<RecursiveReadonly<Partial<IPreferences>>, Subject<RecursiveReadonly<Partial<IPreferences>>>>

@Injectable({
    providedIn: 'root'
})
export class PreferenceService {

    private _preferences: IPreferences
    private _subjectPreferences: SubjectPreferences

    get getPreferences() { return this._preferences }
    get observablePreferences() { return this._subjectPreferences.observable }

    constructor() {
        this._subjectPreferences = new TrackableSubjectWrapper(new Subject())
        this.initPreferences()
    }

    initPreferences() {
        this._preferences = {
            postsPerLoad: 25,
        }
    }

    applyPreferences(value: Partial<IPreferences>) {
        let pass: Partial<IPreferences> = {}
        Object.entries(value).forEach(([key, val]) => {
            this._preferences[key] = val
            pass[key] = val
        })
        this._subjectPreferences.subject.next(pass)
    }
}