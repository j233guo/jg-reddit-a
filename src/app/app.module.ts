import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { SharedModule } from './shared.module';
import { RouterModule } from '@angular/router';
import { routes } from './routes';
import { ContentService } from 'src/services/contentService';
import { HttpClientModule } from '@angular/common/http';
import { UIModule } from './ui.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        SharedModule,
        UIModule,
        RouterModule.forRoot(routes, { useHash: false }),
        HttpClientModule
    ],
    providers: [
        ContentService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
