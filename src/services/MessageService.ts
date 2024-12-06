import { Injectable } from "@angular/core";
import { NzMessageService } from "ng-zorro-antd/message"

@Injectable({
    providedIn: 'root'
})
export class MessageService {

    constructor(
        private _nzMessageService: NzMessageService
    ) {}

    /**
     * Displays an informational message
     * @param message The message to display
     * @param duration The duration for which the message will be displayed (default is 2000ms)
     */
    info(message: string, duration: number = 2000) {
        this._nzMessageService.create('info', message, { nzDuration: duration })
    }

    /**
     * Displays a success message
     * @param message The message to display
     * @param duration The duration for which the message will be displayed (default is 2000ms)
     */
    success(message: string, duration: number = 2000) {
        this._nzMessageService.create('success', message, { nzDuration: duration })
    }

    /**
     * Displays an error message
     * @param message The message to display
     * @param duration The duration for which the message will be displayed (default is 2000ms)
     */
    error(message: string, duration: number = 2000) {
        this._nzMessageService.create('error', message, { nzDuration: duration })
    }

    /**
     * Displays a warning message
     * @param message The message to display
     * @param duration The duration for which the message will be displayed (default is 2000ms)
     */
    warning(message: string, duration: number = 2000) {
        this._nzMessageService.create('warning', message, { nzDuration: duration })
    }
}
