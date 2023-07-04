import { Component, OnInit, ViewChild } from "@angular/core";
import { PostList } from "../PostList";

@Component({
    selector: 'home-page',
    templateUrl: './index.html',
    styleUrls: ['./index.scss']
})
export class HomePage implements OnInit {
    @ViewChild(PostList) postlist: PostList

    constructor() {}
    
    ngOnInit(): void {
        
    }

    ngAfterViewInit() {
        this.postlist.loadPosts()
    }
}