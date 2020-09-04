import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DecoderPasswordService } from './services/decoder-password/decoder-password.service';
import { PageCollapseService } from './services/page-collapse/page-collapse.service';
import { ThemeService } from './services/theme/theme.service';
import { PageRotationService } from './services/page-rotation/page-rotation.service';

@Component({
    selector: 'cv-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None, // For applying global theme class
})
export class AppComponent implements OnInit {

    public readonly passwordUnavailable$ = this.passwordUnavailableChanges();
    public readonly collapsed$ = this.pageCollapse.collapsedChanges();
    public readonly flipped$ = this.pageRotation.isRotatedChanges();

    constructor(
        private activatedRoute: ActivatedRoute,
        private decoderPassword: DecoderPasswordService,
        private theme: ThemeService,
        private pageCollapse: PageCollapseService,
        private pageRotation: PageRotationService,
    ) {
    }

    public ngOnInit(): void {
        this.theme.initialize();
        this.pageCollapse.initialize();
        this.decoderPassword.initialize(this.activatedRoute);
    }

    public toggleCollapse(): void {
        this.pageCollapse.toggle();
    }

    private passwordUnavailableChanges(): Observable<boolean> {
        return this.decoderPassword.passwordChanges()
            .pipe(
                map((password: string) => !password),
            );
    }
}
