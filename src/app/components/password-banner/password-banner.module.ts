import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { PasswordDialogModule } from '../password-dialog/password-dialog.module';
import { PasswordBannerComponent } from './password-banner.component';

@NgModule({
    imports: [
        CommonModule,
        MatIconModule,
        MatDialogModule,
        MatButtonModule,
        PasswordDialogModule,
    ],
    declarations: [
        PasswordBannerComponent,
    ],
    exports: [
        PasswordBannerComponent,
    ],
})
export class PasswordBannerModule {}
