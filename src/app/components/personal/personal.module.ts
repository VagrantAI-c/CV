import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BioModule } from '../bio/bio.module';
import { ContactsModule } from '../contacts/contacts.module';
import { PersonalComponent } from './personal.component';
import { DecodePipe } from '../../pipes/decode.pipe';

@NgModule({
    imports: [
        CommonModule,
        ContactsModule,
        BioModule,
    ],
    declarations: [
        PersonalComponent,
        DecodePipe,
    ],
    exports: [
        PersonalComponent,
    ],
})
export class PersonalModule {}
