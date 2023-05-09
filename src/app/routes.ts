import { Routes } from "@angular/router";
import { PopularPostPage } from "src/components/PopularPostList";

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'popular'},
    { path: 'popular', component: PopularPostPage }
]