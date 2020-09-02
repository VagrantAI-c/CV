import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DecoderPasswordService } from './services/decoder-password/decoder-password.service';
import { ThemeService } from './services/theme/theme.service';

@Component({
    selector: 'cv-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None, // For applying global theme class
})
export class AppComponent implements OnInit {

    public readonly passwordUnavailable$ = this.passwordUnavailableChanges();

    constructor(
        private activatedRoute: ActivatedRoute,
        private decoderPassword: DecoderPasswordService,
        private theme: ThemeService,
    ) {
    }

    public ngOnInit(): void {
        this.theme.initialize();
        this.decoderPassword.initialize(this.activatedRoute);
    }

    private passwordUnavailableChanges(): Observable<boolean> {
        return this.decoderPassword.passwordChanges()
            .pipe(
                map((password: string) => !password),
            );
    }
}
