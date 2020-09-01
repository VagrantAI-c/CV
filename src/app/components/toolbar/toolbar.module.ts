import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { ToolbarComponent } from './toolbar.component';

@NgModule({
    imports: [
        CommonModule,
        MatIconModule,
        MatButtonModule,
    ],
    declarations: [
        ToolbarComponent,
    ],
    exports: [
        ToolbarComponent,
    ],
})
export class ToolbarModule {}
