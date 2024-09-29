import { NgModule } from "@angular/core";
import { NzIconModule } from "ng-zorro-antd/icon";
import {
    ArrowDownOutline,
    ArrowUpOutline,
    BarsOutline,
    CommentOutline,
    FieldTimeOutline,
    FireOutline,
    HomeOutline,
    RedditOutline,
    SearchOutline,
    SettingOutline,
    StarFill,
    StarOutline,
    UploadOutline,
} from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';

const icons: IconDefinition[] = [
    ArrowDownOutline,
    ArrowUpOutline,
    BarsOutline,
    CommentOutline,
    FieldTimeOutline,
    FireOutline,
    HomeOutline,
    RedditOutline,
    SearchOutline,
    SettingOutline,
    StarFill,
    StarOutline,
    UploadOutline,
]

@NgModule({
    imports: [
        NzIconModule.forRoot(icons),
    ],
})
export class IconModule {}
