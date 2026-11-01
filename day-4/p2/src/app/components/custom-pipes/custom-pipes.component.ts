import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TemperaturePipe } from '../../pipes/temperature.pipe';
import { FileSizePipe } from '../../pipes/file-size.pipe';
import { TimeAgoPipe } from '../../pipes/time-ago.pipe';
import { FilterPipe } from '../../pipes/filter.pipe';

export interface LogEvent {
  id: number;
  message: string;
  level: 'info' | 'warning' | 'error';
  timestamp: Date;
}

@Component({
  selector: 'app-custom-pipes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TemperaturePipe,
    FileSizePipe,
    TimeAgoPipe,
    FilterPipe
  ],
  templateUrl: './custom-pipes.component.html',
  styleUrl: './custom-pipes.component.css'
})
export class CustomPipesComponent {
  // Temperature state
  currentCelsius = 28.5;
  tempPrecision = 1;

  // File size state
  rawBytes = 48592184; // ~46.34 MB
  filePrecision = 2;

  // Filter query state
  searchQuery = '';

  // Log events with timestamps for TimeAgoPipe
  events: LogEvent[] = [
    {
      id: 1,
      message: 'Cloud infrastructure health check completed',
      level: 'info',
      timestamp: new Date(Date.now() - 5000) // 5s ago
    },
    {
      id: 2,
      message: 'Database automated snapshot created',
      level: 'info',
      timestamp: new Date(Date.now() - 1000 * 60 * 12) // 12 mins ago
    },
    {
      id: 3,
      message: 'Memory threshold warning detected on worker-3',
      level: 'warning',
      timestamp: new Date(Date.now() - 1000 * 60 * 145) // 2.4 hrs ago
    },
    {
      id: 4,
      message: 'SSL Certificate renewed for api.domain.io',
      level: 'info',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 28) // 1 day ago
    }
  ];

  addRecentEvent() {
    this.events.unshift({
      id: Date.now(),
      message: 'Manual audit ping triggered by developer',
      level: 'info',
      timestamp: new Date()
    });
  }
}
