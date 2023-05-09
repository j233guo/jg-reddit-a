import { Component, OnInit } from "@angular/core";
import { ContentService } from "src/services/contentService";

@Component({
    selector: 'popular-post-page',
    templateUrl: './index.html',
    styleUrls: ['./index.scss']
})
export class PopularPostPage implements OnInit {
    postData: any

    constructor(
        private _content: ContentService
    ) {}

    async ngOnInit() {
        this.postData = await this._content.getPopularPosts()
        console.log(this.postData)
    }
}