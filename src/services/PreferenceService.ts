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
    private readonly PREFERENCES_KEY = 'preferences'

    get getPreferences() { return this._preferences }
    get observablePreferences() { return this._subjectPreferences.observable }

    constructor() {
        this._subjectPreferences = new TrackableSubjectWrapper(new Subject())
        this.loadPreferences()
    }

    /**
     * Applies the provided preferences to the current preferences
     * @param value The new preferences to apply
     */
    applyPreferences(value: Partial<IPreferences>) {
        let pass: Partial<IPreferences> = {}
        Object.entries(value).forEach(([key, val]) => {
            this._preferences[key] = val
            pass[key] = val
        })
        this._subjectPreferences.subject.next(pass)
        this.savePreferences()
    }

    /**
     * Saves the current preferences to local storage
     */
    savePreferences() {
        localStorage.setItem(this.PREFERENCES_KEY, JSON.stringify(this._preferences))
    }

    /**
     * Loads the preferences from local storage
     */
    loadPreferences() {
        const preferences = localStorage.getItem(this.PREFERENCES_KEY)
        if (preferences) {
            this._preferences = JSON.parse(preferences)
        } else {
            this._preferences = {
                postsPerLoad: 25,
            }
        }
    }
}