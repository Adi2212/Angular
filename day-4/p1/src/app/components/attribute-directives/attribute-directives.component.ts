import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HighlightDirective } from '../../directives/highlight.directive';
import { TooltipDirective } from '../../directives/tooltip.directive';
import { CopyClipboardDirective } from '../../directives/copy-clipboard.directive';

@Component({
  selector: 'app-attribute-directives',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HighlightDirective,
    TooltipDirective,
    CopyClipboardDirective
  ],
  templateUrl: './attribute-directives.component.html',
  styleUrl: './attribute-directives.component.css'
})
export class AttributeDirectivesComponent {
  // ngClass states
  isHighlighted = true;
  isCompleted = false;
  hasShadow = true;
  hasBorder = true;
  cardVariant: 'standard' | 'success' | 'danger' | 'gradient' = 'standard';

  // ngStyle states
  cardBgColor = '#1e293b';
  textColor = '#f8fafc';
  cardFontSize = 16;
  cardPadding = 20;
  borderRadius = 12;

  // Custom directive states
  customHighlightColor = '#a855f730';
  tooltipDemoText = '✨ Powerful Angular Custom Tooltip Directive in action!';

  // Code snippets for clipboard
  ngClassSnippet = `<div [ngClass]="{
  'highlight-card': isHighlighted,
  'completed-task': isCompleted,
  'glow-border': hasBorder,
  'variant-gradient': cardVariant === 'gradient'
}">Card Content</div>`;

  ngStyleSnippet = `<div [ngStyle]="{
  'background-color': cardBgColor,
  'color': textColor,
  'font-size.px': cardFontSize,
  'padding.px': cardPadding,
  'border-radius.px': borderRadius
}">Dynamic Styled Card</div>`;
}
