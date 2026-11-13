import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { OfferService } from '../../core/services/offer.service';
import { AdminOfferRequest, Offer } from '../../core/models/offer.model';

@Component({
  selector: 'app-admin-offers',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './admin-offers.component.html',
  styleUrl: './admin-offers.component.css'
})
export class AdminOffersComponent implements OnInit {
  private offerService = inject(OfferService);

  offers = signal<Offer[]>([]);
  showModal = signal(false);

  offerTitle = '';
  offerDesc = '';
  offerDiscount = 15;
  offerBanner = 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1000&fit=crop';
  offerStart = '2026-11-05';
  offerEnd = '2026-11-30';

  ngOnInit(): void {
    this.loadOffers();
  }

  loadOffers(): void {
    this.offerService.getAllAdminOffers().subscribe(o => this.offers.set(o));
  }

  openCreateModal(): void {
    this.showModal.set(true);
  }

  onToggleStatus(id: number): void {
    this.offerService.toggleOfferStatus(id).subscribe(() => this.loadOffers());
  }

  onDeleteOffer(id: number): void {
    if (confirm('Delete this promotional campaign?')) {
      this.offerService.deleteOffer(id).subscribe(() => this.loadOffers());
    }
  }

  onSubmitOffer(): void {
    if (!this.offerTitle || !this.offerDiscount) return;

    const req: AdminOfferRequest = {
      title: this.offerTitle,
      description: this.offerDesc,
      discountPercentage: this.offerDiscount,
      bannerUrl: this.offerBanner,
      startDate: this.offerStart,
      endDate: this.offerEnd,
      isActive: true,
      productIds: [1, 2, 3]
    };

    this.offerService.createOffer(req).subscribe(() => {
      this.showModal.set(false);
      this.loadOffers();
    });
  }
}
