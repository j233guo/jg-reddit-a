import { NgModule } from "@angular/core";
import { NzIconModule } from "ng-zorro-antd/icon";
import { BarsOutline, FireOutline, HomeOutline, RedditOutline, SettingOutline, StarOutline } from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';

const icons: IconDefinition[] = [
    BarsOutline,
    FireOutline,
    HomeOutline,
    RedditOutline,
    SettingOutline,
    StarOutline,
]

@NgModule({
    imports: [
        NzIconModule.forRoot(icons),
    ],
})
export class IconModule {}