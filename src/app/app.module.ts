import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { PersonalModule } from './components/personal/personal.module';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot([], {initialNavigation: true}),
        PersonalModule,
    ],
    declarations: [
        AppComponent,
    ],
    bootstrap: [
        AppComponent,
    ],
})
export class AppModule { }
