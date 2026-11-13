import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { TodoFiltersComponent } from './components/todo-filters/todo-filters.component';
import { TodoInputComponent } from './components/todo-input/todo-input.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoStatsComponent } from './components/todo-stats/todo-stats.component';

@Component({
  selector: 'app-root',
  imports: [
    HeaderComponent,
    TodoStatsComponent,
    TodoInputComponent,
    TodoFiltersComponent,
    TodoListComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class App {}
