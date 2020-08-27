import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'cv-bio',
    templateUrl: './bio.component.html',
    styleUrls: ['./bio.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BioComponent {
}
