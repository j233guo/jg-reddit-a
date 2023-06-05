import { NgModule } from "@angular/core";
import { HomePage } from "src/components/HomePage";
import { PopularPostPage } from "src/components/PopularPostList";
import { PreferencesPage } from "src/components/PreferencesPage";

@NgModule({
    declarations: [
        PopularPostPage,
        HomePage,
        PreferencesPage
    ],
})
export class UIModule {}