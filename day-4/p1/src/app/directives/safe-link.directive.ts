import { Directive, ElementRef, inject, input } from '@angular/core';

@Directive({
  selector: 'a[appSafeLink]',
  standalone: true,
  host: {
    '(click)': 'onConfirmLeavePage($event)'
  }
})
export class SafeLinkDirective {
  // Configurable query parameter to append to the external destination
  queryParam = input('myapp', { alias: 'appSafeLink' });
  confirmMessage = input<string>('You are about to leave this application. Do you wish to continue?');

  private hostElementRef = inject<ElementRef<HTMLAnchorElement>>(ElementRef);

  constructor() {
    const element = this.hostElementRef.nativeElement;
    // Ensure safe target and security attributes
    element.target = '_blank';
    element.rel = 'noopener noreferrer';
    element.classList.add('safe-link-enhanced');
  }

  onConfirmLeavePage(event: MouseEvent) {
    const destinationUrl = this.hostElementRef.nativeElement.href;
    const wantsToLeave = window.confirm(
      `${this.confirmMessage()}\n\nTarget URL: ${destinationUrl}\nQuery added: ?from=${this.queryParam()}`
    );

    if (wantsToLeave) {
      const url = new URL(destinationUrl, window.location.href);
      url.searchParams.set('from', this.queryParam());
      this.hostElementRef.nativeElement.href = url.toString();
      return;
    }

    event.preventDefault();
  }
}
