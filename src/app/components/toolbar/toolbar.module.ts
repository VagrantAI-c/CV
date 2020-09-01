import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ToolbarComponent } from './toolbar.component';

@NgModule({
    imports: [
        CommonModule,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule,
    ],
    declarations: [
        ToolbarComponent,
    ],
    exports: [
        ToolbarComponent,
    ],
})
export class ToolbarModule {}
