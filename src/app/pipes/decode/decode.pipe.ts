import { ChangeDetectorRef, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import CryptoES from 'crypto-es';
import { BehaviorSubject, combineLatest, Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

import { DecoderPasswordService } from '../../services/decoder-password/decoder-password.service';

// Escaped so schematic won't convert this value
const DECODED_DELIMITER = '\%\%';
const ENCODED_DELIMITER = '\#\#';

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
            .subscribe(([password, value]: [string | null, string]) => {
                const lastValue = this.lastValue;
                if (value.startsWith(ENCODED_DELIMITER) && value.endsWith(ENCODED_DELIMITER)) {
                    if (password) {
                        const actualValue = value.split(ENCODED_DELIMITER).filter(Boolean)[0];
                        try {
                            this.lastValue = CryptoES.AES.decrypt(actualValue, password).toString(CryptoES.enc.Utf8);
                        } catch {
                            this.lastValue = value;
                        }
                    } else {
                        this.lastValue = `${value.substr(ENCODED_DELIMITER.length, 16)}...`;
                    }
                } else if (value.startsWith(DECODED_DELIMITER) && value.endsWith(DECODED_DELIMITER)) {
                    this.lastValue = value.split(DECODED_DELIMITER).filter(Boolean)[0];
                } else {
                    this.lastValue = value;
                }

                if (lastValue !== this.lastValue) {
                    this.cdr.markForCheck();
                }
            });
    }
}
