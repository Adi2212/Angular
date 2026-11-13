import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.css'
})
export class StarRatingComponent {
  @Input() rating = 5;
  @Input() readonly = true;
  @Input() size: 'sm' | 'md' | 'lg' = 'sm';
  @Output() ratingChange = new EventEmitter<number>();

  hoverRating = 0;

  onSelect(star: number): void {
    if (!this.readonly) {
      this.rating = star;
      this.ratingChange.emit(star);
    }
  }

  onHover(star: number): void {
    if (!this.readonly) {
      this.hoverRating = star;
    }
  }
}
