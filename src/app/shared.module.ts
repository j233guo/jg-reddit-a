import { NgModule } from "@angular/core";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzLayoutModule } from "ng-zorro-antd/layout"
import { NzMenuModule } from "ng-zorro-antd/menu";
import { IconDefinition } from '@ant-design/icons-angular';

import * as AllIcons from '@ant-design/icons-angular/icons'

const antDesignIcons = AllIcons as {
    [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])

@NgModule({
    declarations: [],
    imports: [
        NzIconModule.forRoot(icons),
        NzLayoutModule,
        NzMenuModule,
    ],
    exports: [
        NzIconModule,
        NzLayoutModule,
        NzMenuModule,
    ],
})
export class SharedModule {}