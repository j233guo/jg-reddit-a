import { HttpClient } from "@angular/common/http";
import { MessageService } from "./MessageService";

export enum ResponseCode {
    OK = 0,
    FAIL_REDDITAPI = -1,
    FAIL_SERVER = -2,
}

export interface IBasicResponse {
    code: ResponseCode
    message?: string
}

export interface IPostListPayload {
    subreddit: string
    listingOption: string
    limit?: number
    before?: string
    after?: string
}

export interface ICommentListPayload {
    subreddit: string
    id: string
    limit?: number
    depth?: number
}

export class RemoteAPIBase {

    protected baseURL: string  = 'http://127.0.0.1:5000'

    public constructor(
        protected _http: HttpClient,
        protected _message: MessageService,
    ) {}

    protected handleStdError(error: IBasicResponse, name?: string) {
        if (!error.message) { error.message = "No error message" }
        if (error.code === ResponseCode.FAIL_REDDITAPI) {
            this._message.error(`${name} Reddit API Error: ${error.message}`)
        } else if (error.code === ResponseCode.FAIL_SERVER) {
            this._message.error(`${name} Server Error: ${error.message}`)
        }
    }

    protected handleStdResponse<T extends IBasicResponse>(value: IBasicResponse, name?: string): T | null {
        if (value.code !== ResponseCode.OK) {
            this.handleStdError(value, name)
            return null
        }
        return value as T
    }

    protected handleUnexpectedResponse(name?: string) {
        this._message.error(`${name} Unexpected response data`)
    }

    protected isStdResponse(value): value is IBasicResponse {
        return (value && typeof(value.code) === 'number')
    }

    protected handleResponse(value: any, name?: string) {
        if (this.isStdResponse(value)) {
            return this.handleStdResponse(value, name)
        } else {
            return this.handleUnexpectedResponse(name)
        }
    }

    protected handleHttpError(name?: string) {
        this._message.error(`Operation failed: [${name}]`)
    }

    protected post(endpoint: string, name?: string, data?: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this._http.post(this.baseURL + endpoint, data).subscribe({
                next: (value) => {
                    return resolve(this.handleResponse(value, name))
                },
                error: (err) => {
                    return reject(err)   
                }
            })
        })
    }

    protected silentPost(endpoint: string, data?: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this._http.post(this.baseURL + endpoint, data).subscribe({
                next: (value) => { 
                    return resolve(value) 
                },
                error: (err) => { 
                    return reject(err) 
                }
            })
        })
    }
}