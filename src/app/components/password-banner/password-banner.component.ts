import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Observable, combineLatest } from 'rxjs';

import { PasswordDialogComponent } from '../password-dialog/password-dialog.component';
import { DecoderPasswordService } from '../../services/decoder-password/decoder-password.service';
import { ThrowStmt } from '@angular/compiler';
import { map } from 'rxjs/operators';

@Component({
    selector: 'cv-password-banner',
    templateUrl: './password-banner.component.html',
    styleUrls: ['./password-banner.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordBannerComponent implements OnDestroy {

    public readonly passwordMissing$ = this.passwordMissingChanges();
    public readonly passwordInvalid$ = this.passwordInvalidChanges();
    private dialogSubscription$: Subscription | undefined;

    constructor(
        private dialog: MatDialog,
        private router: Router,
        private route: ActivatedRoute,
        private decoderPassword: DecoderPasswordService,
    ) {
    }

    public ngOnDestroy(): void {
        this.dialogSubscription$?.unsubscribe();
    }

    public openPasswordDialog(): void {
        this.dialogSubscription$ = this.dialog.open(PasswordDialogComponent)
            .afterClosed()
            .subscribe((password: string) => {
                this.router.navigate([], {relativeTo: this.route, queryParams: {password}});
            });
    }

    private passwordMissingChanges(): Observable<boolean> {
        return this.decoderPassword.passwordChanges()
            .pipe(
                map((password: string | null) => !password),
            );
    }

    private passwordInvalidChanges(): Observable<boolean> {
        return combineLatest([
            this.decoderPassword.passwordChanges(),
            this.decoderPassword.passwordValidChanges(),
        ])
            .pipe(
                map(([password, passwordValid]: [string | null, boolean]) => Boolean(password && !passwordValid)),
            );
    }
}
