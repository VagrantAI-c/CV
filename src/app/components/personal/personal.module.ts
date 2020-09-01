import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BioModule } from '../bio/bio.module';
import { ContactsModule } from '../contacts/contacts.module';
import { PersonalComponent } from './personal.component';
import { DecodeModule } from '../../pipes/decode/decode.module';

@NgModule({
    imports: [
        CommonModule,
        ContactsModule,
        BioModule,
        DecodeModule,
    ],
    declarations: [
        PersonalComponent,
    ],
    exports: [
        PersonalComponent,
    ],
})
export class PersonalModule {}
