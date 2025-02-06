import { HttpClient } from "@angular/common/http";
import { MessageService } from "./MessageService";
import { environment } from "../environments/environment";

export enum ResponseCode {
    OK = 0,
    FAIL_REDDIT_API = -1,
    FAIL_SERVER = -2,
}

export interface IBasicResponse {
    code: ResponseCode
    message?: string
}

export type ListingOption = 'hot'|'top'|'new'|'rising'

export interface IPostListPayload {
    subreddit: string
    listingOption: ListingOption
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

export interface ISubredditNamesPayload {
    query: string
    include_over_18: boolean
    limit?: number
}

export class RemoteAPIBase {

    protected baseURL: string

    public constructor(
        protected _http: HttpClient,
        protected _message: MessageService,
    ) {
        this.baseURL = environment.apiUrl
    }

    /**
     * Handles standard error responses
     * @param error The error response
     * @param name The name of the operation
     */
    protected handleStdError(error: IBasicResponse, name?: string) {
        if (!error.message) { error.message = "No error message" }
        if (error.code === ResponseCode.FAIL_REDDIT_API) {
            this._message.error(`${name} Reddit API Error: ${error.message}`)
        } else if (error.code === ResponseCode.FAIL_SERVER) {
            this._message.error(`${name} Server Error: ${error.message}`)
        }
    }

    /**
     * Handles standard success responses
     * @param value The success response
     * @param name The name of the operation
     * @returns The response data, or null if the response is not OK
     */
    protected handleStdResponse<T extends IBasicResponse>(value: IBasicResponse, name?: string): T | null {
        if (value.code !== ResponseCode.OK) {
            this.handleStdError(value, name)
            return null
        }
        return value as T
    }

    /**
     * Handles unexpected response data
     * @param name The name of the operation
     */
    protected handleUnexpectedResponse(name?: string) {
        this._message.error(`${name} Unexpected response data`)
    }

    /**
     * Checks if the response is a standard response
     * @param value The response data
     * @returns True if the response is a standard response, false otherwise
     */
    protected isStdResponse(value: any): value is IBasicResponse {
        return (value && typeof(value.code) === 'number')
    }

    /**
     * Handles the response based on the response data
     * @param value The response data
     * @param name The name of the operation
     * @returns The response data, or null if the response is not OK
     */
    protected handleResponse(value: any, name?: string) {
        if (this.isStdResponse(value)) {
            return this.handleStdResponse(value, name)
        } else {
            return this.handleUnexpectedResponse(name)
        }
    }

    /**
     * Handles HTTP errors
     * @param name The name of the operation
     */
    protected handleHttpError(name?: string) {
        this._message.error(`Operation failed: [${name}]`)
    }

    /**
     * Sends a POST request to the specified endpoint
     * @param endpoint The endpoint to send the request to
     * @param name The name of the operation
     * @param data The data to send with the request
     * @returns A Promise that resolves to the response data, or null if the request fails
     */
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

    /**
     * Sends a POST request to the specified endpoint without displaying any messages
     * @param endpoint The endpoint to send the request to
     * @param data The data to send with the request
     * @returns A Promise that resolves to the response data
     */
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
