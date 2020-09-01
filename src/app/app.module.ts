import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { PersonalModule } from './components/personal/personal.module';
import { ToolbarModule } from './components/toolbar/toolbar.module';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot([], {initialNavigation: true}),
        PersonalModule,
        ToolbarModule,
    ],
    declarations: [
        AppComponent,
    ],
    bootstrap: [
        AppComponent,
    ],
})
export class AppModule { }
