import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { Page1Module } from './components/page-1/page-1.module';
import { Page2Module } from './components/page-2/page-2.module';
import { PasswordBannerModule } from './components/password-banner/password-banner.module';
import { ToolbarModule } from './components/toolbar/toolbar.module';
import { DecodeModule } from './pipes/decode/decode.module';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot([], {initialNavigation: true}),
        Page1Module,
        Page2Module,
        ToolbarModule,
        PasswordBannerModule,
        DecodeModule,
    ],
    declarations: [
        AppComponent,
    ],
    bootstrap: [
        AppComponent,
    ],
})
export class AppModule { }
