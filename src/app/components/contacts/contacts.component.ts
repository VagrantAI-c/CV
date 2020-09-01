import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Theme } from '../../services/theme/models/theme.enum';
import { ThemeService } from '../../services/theme/theme.service';

@Component({
    selector: 'cv-contacts',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None, // For themable component to work
})
export class ContactsComponent implements OnInit {

    public readonly metropolitenColor$ = this.metropolitenColorChanges();

    constructor(
        private iconRegistry: MatIconRegistry,
        private sanitizer: DomSanitizer,
        private theme: ThemeService,
    ) {
    }

    public ngOnInit(): void {
        this.registerIcon('metropoliten');
        this.registerIcon('telegram');
        this.registerIcon('github-dark');
        this.registerIcon('github-light');
        this.registerIcon('skype');
    }

    private registerIcon(name: string): void {
        this.iconRegistry.addSvgIcon(name, this.sanitizer.bypassSecurityTrustResourceUrl(`assets/${name}.svg`));
    }

    private metropolitenColorChanges(): Observable<string> {
        return this.theme.themeChanges()
            .pipe(
                map((theme: Theme) => theme === Theme.LIGHT
                    ? '#204982' // Original brand color
                    : '#73adff'
                ),
            );
    }
}
