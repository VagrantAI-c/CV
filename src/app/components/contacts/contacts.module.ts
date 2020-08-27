import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { ContactsComponent } from './contacts.component';

@NgModule({
    imports: [
        CommonModule,
        MatIconModule,
    ],
    declarations: [
        ContactsComponent,
    ],
    exports: [
        ContactsComponent,
    ],
})
export class ContactsModule {}
