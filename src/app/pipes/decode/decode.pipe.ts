import { ChangeDetectorRef, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { BehaviorSubject, combineLatest, Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

import { decode } from '../../helpers/decode';
import { ENCODED_DELIMITER, isEncodedString } from '../../helpers/is-encoded-string';
import { DECODED_DELIMITER, isDecodedString } from '../../helpers/is-decoded-string';
import { DecoderPasswordService } from '../../services/decoder-password/decoder-password.service';

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
                if (isEncodedString(value)) {
                    if (password) {
                        this.lastValue = decode(value, password);
                    }
                    if (this.lastValue === value || !this.lastValue) {
                        this.lastValue = `${value.substr(ENCODED_DELIMITER.length, 16)}...`;
                    }
                } else if (isDecodedString(value)) {
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
