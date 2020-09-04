import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PageRotationService {

    private readonly pageCollapsed$ = new BehaviorSubject<boolean>(false);

    public isRotatedChanges(): Observable<boolean> {
        return this.pageCollapsed$.asObservable();
    }

    public flip(): void {
        this.pageCollapsed$.next(!this.pageCollapsed$.getValue());
    }
}
