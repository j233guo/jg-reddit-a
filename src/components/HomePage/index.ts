import { Component, OnInit } from "@angular/core";
import { ContentService } from "src/services/ContentService";

@Component({
    selector: 'home-page',
    templateUrl: './index.html',
    styleUrls: ['./index.scss']
})
export class HomePage implements OnInit {

    constructor() {}
    
    ngOnInit(): void {
        
    }
}