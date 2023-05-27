import { Routes } from "@angular/router";
import { HomePage } from "src/components/HomePage";
import { PopularPostPage } from "src/components/PopularPostList";

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'home'},
    { path: 'home', component: HomePage },
    { path: 'popular', component: PopularPostPage }
]