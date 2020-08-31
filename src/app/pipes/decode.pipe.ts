import { Pipe, PipeTransform, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { BehaviorSubject, combineLatest, Subscription } from 'rxjs';
import CryptoES from 'crypto-es';

import { DecoderPasswordService } from '../services/decoder-password/decoder-password.service';
import { distinctUntilChanged } from 'rxjs/operators';

const DELIMITER = '\%\%';

@Pipe({
    name: 'decode',
    pure: false,
})
export class DecodePipe implements PipeTransform, OnDestroy {

    private passwordSubscription$: Subscription | undefined;
    private value$ = new BehaviorSubject<string>('');
    private lastValue = this.value$.getValue();

    constructor(
        private decoderPassword: DecoderPasswordService,
        private cdr: ChangeDetectorRef,
    ) {
    }

    public ngOnDestroy(): void {
        this.passwordSubscription$?.unsubscribe();
        this.value$.complete();
    }

    public transform(value: string): string {
        this.value$.next(value);
        this.subscribe();

        return this.lastValue;
    }

    private subscribe(): void {
        if (this.passwordSubscription$) {

            return;
        }
        this.passwordSubscription$ = combineLatest([
            this.decoderPassword.passwordChanges(),
            this.value$
                .pipe(
                    distinctUntilChanged(),
                ),
        ])
            .subscribe(([password, value]: string[]) => {
                const lastValue = this.lastValue;
                if (value.startsWith(DELIMITER) && value.endsWith(DELIMITER) && password) {
                    const actualValue = value.split(DELIMITER).filter(Boolean)[0];
                    try {
                        this.lastValue = CryptoES.AES.decrypt(actualValue, password).toString(CryptoES.enc.Utf8);
                    } catch {
                        this.lastValue = value;
                    }
                } else {
                    this.lastValue = value.split(DELIMITER).filter(Boolean)[0];
                }
                if (lastValue !== this.lastValue) {
                    this.cdr.markForCheck();
                }
            });
    }
}
