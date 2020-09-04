import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DecodeModule } from '../../pipes/decode/decode.module';
import { BioModule } from '../bio/bio.module';
import { RelationsModule } from '../relations/relations.module';
import { SeeAlsoModule } from '../see-also/see-also.module';
import { Page2Component } from './page-2.component';

@NgModule({
    imports: [
        CommonModule,
        DecodeModule,
        BioModule,
        RelationsModule,
        SeeAlsoModule,
    ],
    declarations: [
        Page2Component,
    ],
    exports: [
        Page2Component,
    ],
})
export class Page2Module {}
