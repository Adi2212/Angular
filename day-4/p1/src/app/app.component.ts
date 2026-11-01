import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { AttributeDirectivesComponent } from './components/attribute-directives/attribute-directives.component';
import { StructuralDirectivesComponent } from './components/structural-directives/structural-directives.component';
import { SafeLinksComponent } from './components/safe-links/safe-links.component';
import { RoleAuthComponent } from './components/role-auth/role-auth.component';

export type ActiveTab = 'all' | 'attribute' | 'structural' | 'safelink' | 'auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    AttributeDirectivesComponent,
    StructuralDirectivesComponent,
    SafeLinksComponent,
    RoleAuthComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  activeTab: ActiveTab = 'all';

  setActiveTab(tab: ActiveTab) {
    this.activeTab = tab;
  }
}
