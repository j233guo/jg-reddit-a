import { NgModule } from "@angular/core";
import { NzIconModule } from "ng-zorro-antd/icon";
import { BarsOutline, FireOutline, HomeOutline, UserOutline, RedditOutline, StarOutline } from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';

const icons: IconDefinition[] = [
    BarsOutline,
    FireOutline,
    HomeOutline,
    UserOutline,
    RedditOutline,
    StarOutline,
]

@NgModule({
    imports: [
        NzIconModule.forRoot(icons),
    ],
})
export class IconModule {}