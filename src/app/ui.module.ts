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
import { PostPage } from "src/components/PostPage";
import { SafeHtmlPipe } from "src/pipes/safe-html.pipe";
import { PostMedia } from "src/components/PostPage/PostMedia";
import { UrlHandler } from "src/components/PostPage/UrlHandler";
import { SearchPage } from "src/components/SearchPage";

@NgModule({
    declarations: [
        HomePage,
        HotPage,
        ParseUTCPipe,
        PostList,
        PostMedia,
        PostPage,
        PreferencesPage,
        SearchPage,
        SubredditPage,
        SafeHtmlPipe,
        UrlHandler,
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
        SearchPage,
        SubredditPage,
    ]
})
export class UIModule {}