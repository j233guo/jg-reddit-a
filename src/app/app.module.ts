import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {SharedModule} from './shared.module';
import {RouterModule} from '@angular/router';
import {routes} from './routes';
import {APIService} from 'src/services/APIService';
import {HttpClientModule} from '@angular/common/http';
import {UIModule} from './ui.module';
import {MessageService} from 'src/services/MessageService';
import {NzMessageService} from 'ng-zorro-antd/message';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {IconModule} from './icons.module';
import {FormsModule} from '@angular/forms';
import {PreferenceService} from 'src/services/PreferenceService';
import {DirectiveModule} from "./directive.module";
import {UIControlService} from "../services/UIControlService";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        SharedModule,
        UIModule,
        RouterModule.forRoot(routes, {useHash: false}),
        HttpClientModule,
        BrowserAnimationsModule,
        IconModule,
        DirectiveModule,
    ],
    providers: [
        APIService,
        MessageService,
        NzMessageService,
        PreferenceService,
        UIControlService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
