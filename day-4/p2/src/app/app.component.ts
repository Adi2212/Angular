import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { BuiltinPipesComponent } from './components/builtin-pipes/builtin-pipes.component';
import { CustomPipesComponent } from './components/custom-pipes/custom-pipes.component';
import { PureImpureComponent } from './components/pure-impure/pure-impure.component';
import { AsyncPipeComponent } from './components/async-pipe/async-pipe.component';

export type PipeFilterTab = 'all' | 'builtin' | 'custom' | 'pure-impure' | 'async';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    BuiltinPipesComponent,
    CustomPipesComponent,
    PureImpureComponent,
    AsyncPipeComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  activeTab: PipeFilterTab = 'all';

  setActiveTab(tab: PipeFilterTab) {
    this.activeTab = tab;
  }
}
