import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'cv-password-dialog',
    templateUrl: './password-dialog.component.html',
    styleUrls: ['./password-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordDialogComponent {

    public readonly passwordControl = new FormControl();

    public get hasValue(): boolean {
        return Boolean(this.passwordControl.value);
    }

    constructor(
        private dialogRef: MatDialogRef<PasswordDialogComponent>,
    ) {
    }

    public submit(): void {
        this.dialogRef.close(this.passwordControl.value);
    }

    public clearPassword(): void {
        this.passwordControl.setValue('');
    }
}
