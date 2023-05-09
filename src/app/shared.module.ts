import { NgModule } from "@angular/core";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzLayoutModule } from "ng-zorro-antd/layout"
import { NzMenuModule } from "ng-zorro-antd/menu";

@NgModule({
    declarations: [],
    imports: [
        NzIconModule,
        NzLayoutModule,
        NzMenuModule,
    ],
    exports: [
        NzIconModule,
        NzLayoutModule,
        NzMenuModule,
    ],
})
export class SharedModule {

}