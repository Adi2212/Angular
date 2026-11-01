import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService, UserRole } from '../../services/auth.service';
import { AuthDirective } from '../../directives/auth.directive';
import { CopyClipboardDirective } from '../../directives/copy-clipboard.directive';
import { TooltipDirective } from '../../directives/tooltip.directive';

@Component({
  selector: 'app-role-auth',
  standalone: true,
  imports: [
    CommonModule,
    AuthDirective,
    CopyClipboardDirective,
    TooltipDirective
  ],
  templateUrl: './role-auth.component.html',
  styleUrl: './role-auth.component.css'
})
export class RoleAuthComponent {
  authService = inject(AuthService);
  roles: UserRole[] = ['admin', 'editor', 'viewer', 'guest'];

  systemLogs: string[] = [
    '09:42:15 - [SECURITY] User elevated permissions initialized',
    '09:45:30 - [DB] Read replicas synchronized successfully',
    '09:50:11 - [AUTH] Token refreshed for Alex Morgan'
  ];

  authDirectiveSnippet = `<!-- Custom Structural Directive: *appAuth -->
<div *appAuth="'admin'" class="admin-danger-zone">
  <button (click)="purgeSystemLogs()">Purge System Logs</button>
</div>

<div *appAuth="'editor'" class="editor-workspace">
  <p>Editable draft controls...</p>
</div>`;

  purgeLogs() {
    this.systemLogs = ['Logs successfully purged by Administrator at ' + new Date().toLocaleTimeString()];
  }
}
