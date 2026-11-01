import { Directive, ElementRef, HostListener, inject, input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCopyClipboard]',
  standalone: true
})
export class CopyClipboardDirective {
  textToCopy = input.required<string>({ alias: 'appCopyClipboard' });

  private elementRef = inject(ElementRef);
  private renderer = inject(Renderer2);

  @HostListener('click')
  async onClick() {
    try {
      await navigator.clipboard.writeText(this.textToCopy());
      this.showSuccessFeedback();
    } catch {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = this.textToCopy();
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      this.showSuccessFeedback();
    }
  }

  private showSuccessFeedback() {
    const originalText = this.elementRef.nativeElement.innerText;
    this.renderer.addClass(this.elementRef.nativeElement, 'copied-active');
    this.elementRef.nativeElement.innerText = '✓ Copied!';

    setTimeout(() => {
      this.renderer.removeClass(this.elementRef.nativeElement, 'copied-active');
      this.elementRef.nativeElement.innerText = originalText;
    }, 1500);
  }
}
