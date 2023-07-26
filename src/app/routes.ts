import { Routes } from "@angular/router";
import { HomePage } from "src/components/HomePage";
import { HotPage } from "src/components/HotPage";
import { PreferencesPage } from "src/components/PreferencesPage";
import { SearchPage } from "src/components/SearchPage";
import { SubredditPage } from "src/components/SubredditPage";

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'home'},
    { path: 'home', component: HomePage },
    { path: 'hot', component: HotPage },
    { path: 'preferences', component: PreferencesPage },
    { path: 'subreddit/:sub', component: SubredditPage },
    { path: 'search', component: SearchPage },
]