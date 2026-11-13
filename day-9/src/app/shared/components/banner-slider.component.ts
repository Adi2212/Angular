import { Component, OnInit, OnDestroy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Offer } from '../../core/models/offer.model';

interface BannerSlide {
  id: string | number;
  bannerUrl: string;
  title: string;
  description: string;
  discountPercentage?: number;
  productCount?: number;
  isFallback?: boolean;
}

@Component({
  selector: 'app-banner-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './banner-slider.component.html',
  styleUrl: './banner-slider.component.css'
})
export class BannerSliderComponent implements OnInit, OnDestroy {
  private http = inject(HttpClient);
  private router = inject(Router);

  current = signal(0);
  slides = signal<BannerSlide[]>([]);

  private intervalId: any = null;

  // Fallback banners matching React BannerSlider.jsx
  private defaultBanners: BannerSlide[] = [
    {
      id: 'def-1',
      bannerUrl: 'assets/offer1.png',
      title: 'Fresh Harvest Deals',
      description: 'Directly from trusted local farmers',
      isFallback: true
    },
    {
      id: 'def-2',
      bannerUrl: 'assets/offer2.png',
      title: 'Special Agri Discounts',
      description: 'Save big on seasonal essentials',
      isFallback: true
    },
    {
      id: 'def-3',
      bannerUrl: 'assets/offer3.png',
      title: 'Organic Best Sellers',
      description: '100% natural and certified products',
      isFallback: true
    }
  ];

  ngOnInit(): void {
    this.slides.set(this.defaultBanners);
    this.fetchActiveOffers();
    this.startAutoplay();
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private fetchActiveOffers(): void {
    this.http.get<Offer[]>('http://localhost:9090/offers/active').subscribe({
      next: (offers) => {
        if (offers && Array.isArray(offers) && offers.length > 0) {
          const dynamicSlides: BannerSlide[] = offers.map(o => ({
            id: o.id,
            bannerUrl: o.bannerUrl || 'assets/offer1.png',
            title: o.title,
            description: o.description || '',
            discountPercentage: o.discountPercentage,
            productCount: o.productCount || 4,
            isFallback: false
          }));
          this.slides.set(dynamicSlides);
        }
      },
      error: () => {
        // Keep default fallback banners
      }
    });
  }

  private startAutoplay(): void {
    this.intervalId = setInterval(() => {
      this.next();
    }, 4500);
  }

  next(): void {
    const total = this.slides().length;
    if (total > 0) {
      this.current.set((this.current() + 1) % total);
    }
  }

  prev(): void {
    const total = this.slides().length;
    if (total > 0) {
      this.current.set((this.current() - 1 + total) % total);
    }
  }

  nextSlide(e: Event): void {
    e.stopPropagation();
    this.next();
  }

  prevSlide(e: Event): void {
    e.stopPropagation();
    this.prev();
  }

  goToSlide(idx: number): void {
    this.current.set(idx);
  }

  onSlideClick(slide: BannerSlide): void {
    if (slide.isFallback) return;
    this.router.navigate(['/offers']);
  }

  onImgError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/offer1.png';
  }
}
