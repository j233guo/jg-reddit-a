import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HomePage } from "src/components/HomePage";
import { PreferencesPage } from "src/components/PreferencesPage";
import { SharedModule } from "./shared.module";
import { PostList } from "src/components/PostList";
import { PopularPage } from "src/components/PopularPage";

@NgModule({
    declarations: [
        HomePage,
        PopularPage,
        PreferencesPage,
        PostList,
    ],
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
    ],
    exports: [
        HomePage,
        PopularPage,
        PreferencesPage,
    ]
})
export class UIModule {}