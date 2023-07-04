import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PostList } from "../PostList";

@Component({
    selector: 'subreddit-page',
    templateUrl: './index.html',
    styleUrls: ['./index.scss']
})
export class SubredditPage implements OnInit {
    @ViewChild(PostList) postlist: PostList

    subreddit: string | null

    constructor(
        private route: ActivatedRoute
    ) {
        this.subreddit = this.route.snapshot.paramMap.get('sub')
    }
    
    ngOnInit(): void {
        
    }

    ngAfterViewInit() {
        this.postlist.loadPosts()
        this.route.params.subscribe(param => {
            this.subreddit = param["sub"]
            this.postlist.loadPosts(true)
        })
    }
}