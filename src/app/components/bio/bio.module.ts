import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BioComponent } from './bio.component';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        BioComponent,
    ],
    exports: [
        BioComponent,
    ]
})
export class BioModule { }
