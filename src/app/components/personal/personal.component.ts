import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'cv-personal',
    templateUrl: './personal.component.html',
    styleUrls: ['./personal.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None, // For themable component to work
})
export class PersonalComponent {
}
