import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DecodeModule } from '../../pipes/decode/decode.module';
import { BioComponent } from './bio.component';

@NgModule({
    imports: [
        CommonModule,
        DecodeModule,
    ],
    declarations: [
        BioComponent,
    ],
    exports: [
        BioComponent,
    ]
})
export class BioModule { }
