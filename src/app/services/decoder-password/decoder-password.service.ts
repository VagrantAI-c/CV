import { Injectable } from '@angular/core';
import { ActivatedRoute, convertToParamMap, ParamMap } from '@angular/router';
import { BehaviorSubject, merge, Observable, of } from 'rxjs';
import { distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';

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

    /**
     * Returns stream of password to decode AES hashes
     */
    public passwordChanges(): Observable<string> {
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
