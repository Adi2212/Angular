import { Directive, effect, inject, input, TemplateRef, ViewContainerRef } from '@angular/core';

export interface RepeatContext {
  $implicit: number;
  index: number;
  first: boolean;
  last: boolean;
  even: boolean;
  odd: boolean;
}

@Directive({
  selector: '[appRepeat]',
  standalone: true
})
export class RepeatDirective {
  count = input.required<number>({ alias: 'appRepeat' });

  private templateRef = inject<TemplateRef<RepeatContext>>(TemplateRef);
  private viewContainer = inject(ViewContainerRef);

  constructor() {
    effect(() => {
      const times = Math.max(0, this.count());
      this.viewContainer.clear();

      for (let i = 0; i < times; i++) {
        const context: RepeatContext = {
          $implicit: i + 1,
          index: i,
          first: i === 0,
          last: i === times - 1,
          even: i % 2 === 0,
          odd: i % 2 !== 0
        };
        this.viewContainer.createEmbeddedView(this.templateRef, context);
      }
    });
  }
}
