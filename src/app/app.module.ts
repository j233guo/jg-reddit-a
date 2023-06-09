import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { SharedModule } from './shared.module';
import { RouterModule } from '@angular/router';
import { routes } from './routes';
import { APIService } from 'src/services/APIService';
import { HttpClientModule } from '@angular/common/http';
import { UIModule } from './ui.module';
import { MessageService } from 'src/services/MessageService';
import { NzMessageService } from 'ng-zorro-antd/message';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { IconModule } from './icons.module';
import { AppearanceService } from 'src/services/AppearanceService';
import { LoadingService } from 'src/services/LoadingService';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        SharedModule,
        UIModule,
        RouterModule.forRoot(routes, { useHash: false }),
        HttpClientModule,
        BrowserAnimationsModule,
        IconModule,
    ],
    providers: [
        APIService,
        MessageService,
        NzMessageService,
        AppearanceService,
        LoadingService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
