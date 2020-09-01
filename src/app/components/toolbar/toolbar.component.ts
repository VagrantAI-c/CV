import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Theme } from '../../services/theme/models/theme.enum';
import { ThemeService } from '../../services/theme/theme.service';

@Component({
    selector: 'cv-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None, // For themable component to work
})
export class ToolbarComponent {

    public readonly themeIcon$ = this.themeIconChanges();

    constructor(
        private theme: ThemeService,
    ) {
    }

    public toggleTheme(): void {
        this.theme.set(this.theme.get() === Theme.DARK
            ? Theme.LIGHT
            : Theme.DARK
        );
    }

    private themeIconChanges(): Observable<string> {
        return this.theme.themeChanges()
            .pipe(
                map((theme: Theme) => theme === Theme.LIGHT
                    ? 'brightness_2'
                    : 'brightness_5'
                ),
            );
    }

}
