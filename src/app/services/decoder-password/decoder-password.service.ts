import { Injectable } from '@angular/core';
import { ActivatedRoute, convertToParamMap, ParamMap } from '@angular/router';
import { BehaviorSubject, merge, Observable, of } from 'rxjs';
import { distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';

import { decode } from '../../helpers/decode';

@Injectable({
    providedIn: 'root',
})
export class DecoderPasswordService {

    private readonly activatedRoute$ = new BehaviorSubject<ActivatedRoute | null>(null);

    /**
     * Service cannot be injected with ActivatedRoute on its own,
     * so we expect any component inject in from outside in this
     * two-phase initialization manner
     */
    public initialize(activatedRoute: ActivatedRoute): void {
        this.activatedRoute$.next(activatedRoute);
    }

    public passwordValidChanges(): Observable<boolean> {
        return this.passwordChanges()
            .pipe(
                // I still wonder whether this is a good case to leave
                // encoded phrase as is. I don't have enough security
                // knowledge to determine whether real password can be
                // compromised this way.
                map((password: string | null) => password
                    // Encoded phrase might take too much symbols, so linting is disabled for next line
                    // tslint:disable-next-line: max-line-length
                    ? decode('##U2FsdGVkX18LSxhrl6T88/l/jUnQEiqq3lPDbPgS0OTAWDwDs8WsOKAuybNl8Wp2##', password) === 'Red, brown and green'
                    : false
                ),
            );
    }

    /**
     * Returns stream of password to decode AES hashes
     */
    public passwordChanges(): Observable<string | null> {
        return this.activatedRoute$
            .pipe(
                filter<ActivatedRoute | null>(Boolean),
                switchMap((activatedRoute: ActivatedRoute | null) => activatedRoute
                    ? merge(
                        activatedRoute.queryParamMap,
                        of(activatedRoute.snapshot.queryParamMap),
                    )
                    : of(convertToParamMap({}))
                ),
                map((queryParams: ParamMap) => queryParams.get('password') || ''),
                distinctUntilChanged(),
            );
    }
}
