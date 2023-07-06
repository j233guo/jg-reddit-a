import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HomePage } from "src/components/HomePage";
import { PreferencesPage } from "src/components/PreferencesPage";
import { SharedModule } from "./shared.module";
import { PostList } from "src/components/PostList";
import { HotPage } from "src/components/HotPage";
import { SubredditPage } from "src/components/SubredditPage";
import { ParseUTCPipe } from "src/pipes/parse-utc.pipe";

@NgModule({
    declarations: [
        HomePage,
        HotPage,
        PreferencesPage,
        PostList,
        SubredditPage,
        ParseUTCPipe,
    ],
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
    ],
    exports: [
        HomePage,
        HotPage,
        PreferencesPage,
        SubredditPage,
    ]
})
export class UIModule {}