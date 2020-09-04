import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';

const PAGE_COLLAPSE_COOKIE_NAME = 'cv-page-collapse';

@Injectable({
    providedIn: 'root',
})
export class PageCollapseService {

    private readonly pageCollapsed$ = new BehaviorSubject<boolean>(false);

    constructor(
        private cookie: CookieService,
    ) {
    }

    public collapsedChanges(): Observable<boolean> {
        return this.pageCollapsed$.asObservable();
    }

    public toggle(): void {
        this.set(!this.pageCollapsed$.getValue());
    }

    public initialize(): void {
        if (this.cookie.check(PAGE_COLLAPSE_COOKIE_NAME)) {
            this.set(this.cookie.get(PAGE_COLLAPSE_COOKIE_NAME) === 'true');
        }
    }

    private set(collapsed: boolean): void {
        this.pageCollapsed$.next(collapsed);
        this.cookie.set(PAGE_COLLAPSE_COOKIE_NAME, `${this.pageCollapsed$.getValue()}`);
    }
}
