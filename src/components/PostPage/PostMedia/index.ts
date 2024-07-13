import {Component, Input, OnInit} from "@angular/core";

@Component({
    selector: "post-media",
    templateUrl: "./index.html",
    styleUrls: ["./index.scss"]
})
export class PostMedia implements OnInit{
    @Input() media: any

    ngOnInit() {
        console.log(this.media)
    }
}
