import {Component, Input, OnChanges} from "@angular/core";
import {IMediaMetadata} from "../../../data/dataTypes";

interface IGalleryData {
    url: string
    x: number
    y: number
}

@Component({
    selector: "post-media",
    templateUrl: "./index.html",
    styleUrls: ["./index.scss"]
})
export class PostMedia implements OnChanges {
    @Input() media: any
    @Input() mediaMetadata: Record<string, IMediaMetadata>

    gallery: IGalleryData[] = []

    ngOnChanges() {
        function getImageUrl(url?: string): string | null {
            if (!url) { return null }
            const regex = /https:\/\/preview\.redd\.it\/([^?]+)/;
            const match = url.match(regex);
            return match ? `https://i.redd.it/${match[1]}` : null;
        }

        if (this.mediaMetadata) {
            this.gallery = []
            Object.values(this.mediaMetadata).forEach(item => {
                this.gallery.push({
                    url: (item.e === 'Image' ? getImageUrl(item.s.u) : getImageUrl(item.s.gif)) ?? '',
                    x: item.s.x,
                    y: item.s.y,
                })
            })
        }
    }
}
