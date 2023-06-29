import { Routes } from "@angular/router";
import { HomePage } from "src/components/HomePage";
import { PopularPage } from "src/components/PopularPage";
import { PreferencesPage } from "src/components/PreferencesPage";

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'home'},
    { path: 'home', component: HomePage },
    { path: 'popular', component: PopularPage },
    { path: 'preferences', component: PreferencesPage },
]