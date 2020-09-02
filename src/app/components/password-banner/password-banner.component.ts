import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { PasswordDialogComponent } from '../password-dialog/password-dialog.component';

@Component({
    selector: 'cv-password-banner',
    templateUrl: './password-banner.component.html',
    styleUrls: ['./password-banner.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordBannerComponent implements OnDestroy {

    private dialogSubscription$: Subscription | undefined;

    constructor(
        private dialog: MatDialog,
        private router: Router,
        private route: ActivatedRoute,
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
}
