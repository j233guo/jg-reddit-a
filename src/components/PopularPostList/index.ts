import { Component, OnInit } from "@angular/core";
import { MessageService } from "src/services/MessageService";
import { ContentService } from "src/services/ContentService"

@Component({
    selector: 'popular-post-page',
    templateUrl: './index.html',
    styleUrls: ['./index.scss']
})
export class PopularPostPage implements OnInit {
    postData: any

    constructor(
        private _content: ContentService,
        private _message: MessageService
    ) {}

    async ngOnInit() {
        this.postData = await this._content.getPopularPosts()
        console.log(this.postData)
        this._message.success("successfully loaded")
    }
}