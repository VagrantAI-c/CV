import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'cv-page-1',
    templateUrl: './page-1.component.html',
    styleUrls: ['./page-1.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None, // For themable component to work
})
export class Page1Component {
}
