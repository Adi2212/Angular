import { Directive, ElementRef, HostListener, inject, input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTooltip]',
  standalone: true
})
export class TooltipDirective {
  tooltipText = input.required<string>({ alias: 'appTooltip' });
  position = input<'top' | 'bottom'>('top');

  private elementRef = inject(ElementRef);
  private renderer = inject(Renderer2);
  private tooltipElement: HTMLElement | null = null;

  @HostListener('mouseenter')
  show() {
    if (this.tooltipElement || !this.tooltipText()) return;

    // Create tooltip container
    this.tooltipElement = this.renderer.createElement('div');
    const textNode = this.renderer.createText(this.tooltipText());
    this.renderer.appendChild(this.tooltipElement, textNode);

    // Apply styling
    this.renderer.addClass(this.tooltipElement, 'app-custom-tooltip');
    if (this.position() === 'bottom') {
      this.renderer.addClass(this.tooltipElement, 'tooltip-bottom');
    } else {
      this.renderer.addClass(this.tooltipElement, 'tooltip-top');
    }

    // Append to body and position
    this.renderer.appendChild(document.body, this.tooltipElement);
    this.calculatePosition();
  }

  @HostListener('mouseleave')
  hide() {
    if (this.tooltipElement) {
      this.renderer.removeChild(document.body, this.tooltipElement);
      this.tooltipElement = null;
    }
  }

  private calculatePosition() {
    if (!this.tooltipElement) return;

    const hostRect = this.elementRef.nativeElement.getBoundingClientRect();
    const tooltipRect = this.tooltipElement.getBoundingClientRect();

    const left = hostRect.left + (hostRect.width - tooltipRect.width) / 2 + window.scrollX;
    let top = 0;

    if (this.position() === 'bottom') {
      top = hostRect.bottom + 8 + window.scrollY;
    } else {
      top = hostRect.top - tooltipRect.height - 8 + window.scrollY;
    }

    this.renderer.setStyle(this.tooltipElement, 'left', `${Math.max(10, left)}px`);
    this.renderer.setStyle(this.tooltipElement, 'top', `${top}px`);
  }
}
