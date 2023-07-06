import { NgModule } from "@angular/core";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzLayoutModule } from "ng-zorro-antd/layout";
import { NzMenuModule } from "ng-zorro-antd/menu";
import { IconDefinition } from '@ant-design/icons-angular';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzSelectModule } from 'ng-zorro-antd/select'
import { NzToolTipModule } from 'ng-zorro-antd/tooltip'
import { NzDividerModule } from 'ng-zorro-antd/divider'

import * as AllIcons from '@ant-design/icons-angular/icons'
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

const antDesignIcons = AllIcons as {
    [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])

@NgModule({
    declarations: [],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NzIconModule.forRoot(icons),
        NzDividerModule,
        NzGridModule,
        NzLayoutModule,
        NzMenuModule,
        NzSelectModule,
        NzSpinModule,
        NzToolTipModule,
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        NzIconModule,
        NzDividerModule,
        NzGridModule,
        NzLayoutModule,
        NzMenuModule,
        NzSelectModule,
        NzSpinModule,
        NzToolTipModule,
    ],
})
export class SharedModule {}