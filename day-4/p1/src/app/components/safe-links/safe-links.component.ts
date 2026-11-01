import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SafeLinkDirective } from '../../directives/safe-link.directive';
import { TooltipDirective } from '../../directives/tooltip.directive';
import { CopyClipboardDirective } from '../../directives/copy-clipboard.directive';

@Component({
  selector: 'app-safe-links',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SafeLinkDirective,
    TooltipDirective,
    CopyClipboardDirective
  ],
  templateUrl: './safe-links.component.html',
  styleUrl: './safe-links.component.css'
})
export class SafeLinksComponent {
  customAppName = 'day4-showcase';
  customUrl = 'https://angular.dev/guide/directives';

  safeLinkSnippet = `<a href="https://angular.dev"
   appSafeLink="directives-app"
   confirmMessage="Leaving our portal to Angular Docs. Continue?">
  Angular Docs ↗
</a>`;
}
