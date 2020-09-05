import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Injectable({
    providedIn: 'root',
})
export class PageRotationService {

    private readonly pageCollapsed$ = new BehaviorSubject<boolean>(false);

    constructor(
        @Inject(DOCUMENT) private document: Document,
    ) {
    }

    public isRotatedChanges(): Observable<boolean> {
        return this.pageCollapsed$.asObservable();
    }

    public flip(): void {
        this.pageCollapsed$.next(!this.pageCollapsed$.getValue());
        this.document.defaultView?.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }
}
