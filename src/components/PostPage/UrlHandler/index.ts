import { Component, Input } from "@angular/core";

@Component({
    selector: "url-handler",
    templateUrl: "./index.html",
    styleUrls: ["./index.scss"]
})
export class UrlHandler {
    @Input() url: string;

    isImage: boolean = false
    isRedditLink: boolean = false

    ngOnChanges() {
        this.isImage = /\.(jpeg|jpg|gif|png)$/.test(this.url)
        this.isRedditLink = !this.isImage && !this.url.includes('reddit.com')
    }
}