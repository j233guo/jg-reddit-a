import { Component, OnInit } from "@angular/core";
import { APIService } from "src/services/APIService";

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