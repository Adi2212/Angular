import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OfferService } from '../../core/services/offer.service';
import { ProductService } from '../../core/services/product.service';
import { Offer } from '../../core/models/offer.model';
import { Product } from '../../core/models/product.model';
import { ProductCardComponent } from '../../shared/components/product-card.component';

@Component({
  selector: 'app-offers',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductCardComponent],
  templateUrl: './offers.component.html',
  styleUrl: './offers.component.css'
})
export class OffersComponent implements OnInit {
  offerService = inject(OfferService);
  productService = inject(ProductService);

  offers = signal<Offer[]>([]);
  allProducts = signal<Product[]>([]);

  ngOnInit(): void {
    this.offerService.getActiveOffers().subscribe(offs => this.offers.set(offs || []));
    this.productService.getAllProducts().subscribe(prods => this.allProducts.set(prods || []));
  }

  getOfferProducts(offerId: number): Product[] {
    return this.allProducts().filter(p => p.offer?.id === offerId || (p.discountedPrice && p.discountedPrice < p.price));
  }
}
