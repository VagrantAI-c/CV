import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DecodeModule } from '../../pipes/decode/decode.module';
import { BioModule } from '../bio/bio.module';
import { PersonalModule } from '../personal/personal.module';
import { Page1Component } from './page-1.component';

@NgModule({
    imports: [
        CommonModule,
        BioModule,
        DecodeModule,
        PersonalModule,
    ],
    declarations: [
        Page1Component,
    ],
    exports: [
        Page1Component,
    ],
})
export class Page1Module {}
