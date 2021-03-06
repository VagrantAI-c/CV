import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DecodeModule } from '../../pipes/decode/decode.module';
import { PersonalComponent } from './personal.component';
import { ContactsModule } from '../contacts/contacts.module';

@NgModule({
    imports: [
        CommonModule,
        DecodeModule,
        ContactsModule,
    ],
    declarations: [
        PersonalComponent,
    ],
    exports: [
        PersonalComponent,
    ],
})
export class PersonalModule {}
