import { NgModule } from "@angular/core";
import { NzIconModule } from "ng-zorro-antd/icon";
import { BarsOutline, RiseOutline, HomeOutline, UserOutline, RedditOutline } from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';

const icons: IconDefinition[] = [
    BarsOutline,
    RiseOutline,
    HomeOutline,
    UserOutline,
    RedditOutline,
]

@NgModule({
    imports: [
        NzIconModule.forRoot(icons),
    ],
})
export class IconModule {}