import { HttpClient } from "@angular/common/http";

export class RemoteAPIService {

    protected baseURL: string  = 'http://127.0.0.1:5000/'

    public constructor(
        protected _http: HttpClient,
    ) {}

    protected post(endpoint: string, data?: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this._http.post(this.baseURL + endpoint, data).subscribe({
                next: (value) => {
                    return resolve(value)
                },
                error: (err) => {
                    return resolve(null)
                }
            })
        })
    }
}