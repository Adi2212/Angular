import { Component, inject } from '@angular/core';

import { AvailablePlacesComponent } from './places/available-places/available-places.component';
import { UserPlacesComponent } from './places/user-places/user-places.component';
import { ErrorService } from './shared/error.service';
import { HttpService } from './shared/http.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [AvailablePlacesComponent, UserPlacesComponent],
})
export class AppComponent {
  private errorService = inject(ErrorService);
  private httpService = inject(HttpService);

  error = this.errorService.error;
  isNetworkLoading = this.httpService.isLoading;

  onErrorClose(): void {
    this.errorService.clearError();
  }
}
