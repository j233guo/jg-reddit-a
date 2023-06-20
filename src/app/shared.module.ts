import { NgModule } from "@angular/core";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzLayoutModule } from "ng-zorro-antd/layout";
import { NzMenuModule } from "ng-zorro-antd/menu";
import { IconDefinition } from '@ant-design/icons-angular';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzSelectModule } from 'ng-zorro-antd/select'

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
        NzGridModule,
        NzDropDownModule,
        NzSpinModule,
        NzSelectModule,
    ],
    exports: [
        NzIconModule,
        NzLayoutModule,
        NzMenuModule,
        NzGridModule,
        NzDropDownModule,
        NzSpinModule,
        NzSelectModule,
    ],
})
export class SharedModule {}