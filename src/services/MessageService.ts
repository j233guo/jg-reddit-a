import { Injectable } from "@angular/core";
import { NzMessageService } from "ng-zorro-antd/message"

@Injectable()
export class MessageService {

    constructor(
        private _nzMessageService: NzMessageService
    ) {}

    info(message: string, duration: number = 2000) {
        this._nzMessageService.create('info', message, { nzDuration: duration })
    }

    success(message: string, duration: number = 2000) {
        this._nzMessageService.create('success', message, { nzDuration: duration })
    }

    error(message: string, duration: number = 2000) {
        this._nzMessageService.create('error', message, { nzDuration: duration })
    }

    warning(message: string, duration: number = 2000) {
        this._nzMessageService.create('warning', message, { nzDuration: duration })
    }
}
