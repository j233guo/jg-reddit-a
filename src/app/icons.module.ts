import { NgModule } from "@angular/core";
import { NzIconModule } from "ng-zorro-antd/icon";
import { BarsOutline, RiseOutline, HomeOutline } from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';

const icons: IconDefinition[] = [
    BarsOutline,
    RiseOutline,
    HomeOutline
]

@NgModule({
    imports: [
        NzIconModule.forRoot(icons),
    ],
})
export class IconModule {}