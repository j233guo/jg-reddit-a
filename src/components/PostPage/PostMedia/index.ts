import { Component, Input } from "@angular/core";

@Component({
    selector: "post-media",
    templateUrl: "./index.html",
    styleUrls: ["./index.scss"]
})
export class PostMedia {
    @Input() media: any
}