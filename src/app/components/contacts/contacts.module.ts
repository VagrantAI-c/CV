import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { DecodeModule } from '../../pipes/decode/decode.module';
import { ContactsComponent } from './contacts.component';

@NgModule({
    imports: [
        CommonModule,
        MatIconModule,
        DecodeModule,
    ],
    declarations: [
        ContactsComponent,
    ],
    exports: [
        ContactsComponent,
    ],
})
export class ContactsModule {}
