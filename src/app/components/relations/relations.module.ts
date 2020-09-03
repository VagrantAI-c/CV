import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DecodeModule } from '../../pipes/decode/decode.module';
import { RelationsComponent } from './relations.component';

@NgModule({
    imports: [
        CommonModule,
        DecodeModule,
    ],
    declarations: [
        RelationsComponent,
    ],
    exports: [
        RelationsComponent,
    ],
})
export class RelationsModule {}
