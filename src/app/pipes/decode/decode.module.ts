import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DecodePipe } from './decode.pipe';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        DecodePipe,
    ],
    exports: [
        DecodePipe,
    ],
})
export class DecodeModule {}
