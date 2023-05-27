import { NgModule } from "@angular/core";
import { HomePage } from "src/components/HomePage";
import { PopularPostPage } from "src/components/PopularPostList";

@NgModule({
    declarations: [
        PopularPostPage,
        HomePage,
    ],
})
export class UIModule {}