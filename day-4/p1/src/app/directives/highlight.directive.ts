import { Directive, ElementRef, HostBinding, HostListener, inject, input } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective {
  highlightColor = input<string>('#38bdf820'); // Light cyan tint
  defaultColor = input<string>('transparent');
  highlightBorder = input<string>('#38bdf8');

  private elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  @HostBinding('style.backgroundColor')
  backgroundColor = this.defaultColor();

  @HostBinding('style.borderColor')
  borderColor = 'transparent';

  @HostBinding('style.transition')
  transition = 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)';

  @HostBinding('style.cursor')
  cursor = 'pointer';

  @HostListener('mouseenter')
  onMouseEnter() {
    this.backgroundColor = this.highlightColor();
    this.borderColor = this.highlightBorder();
    this.elementRef.nativeElement.style.transform = 'translateY(-3px)';
    this.elementRef.nativeElement.style.boxShadow = '0 10px 25px -5px rgba(56, 189, 248, 0.25)';
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.backgroundColor = this.defaultColor();
    this.borderColor = 'transparent';
    this.elementRef.nativeElement.style.transform = 'translateY(0)';
    this.elementRef.nativeElement.style.boxShadow = 'none';
  }
}
