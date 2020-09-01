import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'cv-contacts',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None, // For themable component to work
})
export class ContactsComponent implements OnInit {

    constructor(
        private iconRegistry: MatIconRegistry,
        private sanitizer: DomSanitizer,
    ) {
    }

    public ngOnInit(): void {
        this.registerIcon('metropoliten');
        this.registerIcon('telegram');
        this.registerIcon('github-dark');
        this.registerIcon('github-light');
        this.registerIcon('skype');
    }

    private registerIcon(name: string): void {
        this.iconRegistry.addSvgIcon(name, this.sanitizer.bypassSecurityTrustResourceUrl(`assets/${name}.svg`));
    }

}
