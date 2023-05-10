import { Observable, Subject, Unsubscribable } from "rxjs";
import { RecursiveReadonly } from "./tslang";

type TypeOfSubscriptions = { [index:string] : number }

export class SubscriptionHandle {
    constructor(
        public name: string,
        public subscription: Unsubscribable,
        public subscriptions: TypeOfSubscriptions
    ) {}

    unsubscribe() {
        this.subscription.unsubscribe()
        this.subscriptions[this.name] = this.subscriptions[this.name] - 1
    }
}

export class TrackableObservable<K, T extends Observable<K> = Observable<K>> {
    _subscriptions: TypeOfSubscriptions = Object.create(null)

    constructor(
        private _observable: Observable<K>
    ) {}
    
    subscribe(name: string|object, next: (value: K) => void, error?: (error: any) => void, complete?: () => void): SubscriptionHandle {
        if (!name || !next || (typeof(name) !== 'string' && typeof(name) !== 'object')) throw 'Name and Next Required'
        let handle = this._observable.subscribe(next, error, complete)
        let key = (typeof(name) === 'string' ? name : name.constructor.name)
        this._subscriptions[key] = (key in this._subscriptions ? this._subscriptions[key] + 1 : 1)
        return new SubscriptionHandle(key, handle, this._subscriptions)
    }
}

export class TrackableSubjectWrapper<T extends {[index:string] : any}, TSubject extends Subject<T>> {
    private _observable: TrackableObservable<T>

    constructor(
        private _subject: TSubject,
        public name: string = 'unnamed'
    ) {
        this._observable = new TrackableObservable<T>(_subject)
    }

    public get observable(): TrackableObservable<RecursiveReadonly<T>> {
        return this._observable
    }

    public get subject(): TSubject {
        return this._subject
    }
}