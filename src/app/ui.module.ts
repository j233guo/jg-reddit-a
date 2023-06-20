import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { HomePage } from "src/components/HomePage";
import { PreferencesPage } from "src/components/PreferencesPage";

@NgModule({
    declarations: [
        HomePage,
        PreferencesPage,
    ],
    imports: [
        CommonModule,
    ],
})
export class UIModule {}