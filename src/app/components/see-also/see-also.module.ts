import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DecodeModule } from '../../pipes/decode/decode.module';
import { SeeAlsoComponent } from './see-also.component';

@NgModule({
    imports: [
        CommonModule,
        DecodeModule,
    ],
    declarations: [
        SeeAlsoComponent,
    ],
    exports: [
        SeeAlsoComponent,
    ],
})
export class SeeAlsoModule {}
