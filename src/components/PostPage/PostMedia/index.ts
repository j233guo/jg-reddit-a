import {Component, Input, OnChanges, OnInit} from "@angular/core";

export interface IPostGalleryData {
    type: 'Image' | 'AnimatedImage',
    x: number
    y: number
    url?: string
    gif?: string
    mp4?: string
}

@Component({
    selector: "post-media",
    templateUrl: "./index.html",
    styleUrls: ["./index.scss"]
})
export class PostMedia implements OnInit, OnChanges{
    @Input() media: any
    @Input() mediaMetadata: object[]

    mediaMetadataContent: IPostGalleryData[] = []

    ngOnInit() {
        console.log(this.media)
        console.log(this.mediaMetadata)
    }

    ngOnChanges() {

    }
}
