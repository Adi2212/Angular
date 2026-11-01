import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface ProductItem {
  id: string;
  name: string;
  category: string;
  price: number;
  discountRate: number;
  releaseDate: Date;
  rating: number;
  inStock: boolean;
}

@Component({
  selector: 'app-builtin-pipes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './builtin-pipes.component.html',
  styleUrl: './builtin-pipes.component.css'
})
export class BuiltinPipesComponent {
  // Text transform state
  textInput = 'Angular 18 Enterprise Framework';

  // Date format state
  selectedDate: string = new Date().toISOString().substring(0, 10);
  dateFormat = 'medium';
  availableDateFormats = ['short', 'medium', 'longDate', 'fullDate', 'yyyy-MM-dd HH:mm:ss'];

  // Currency & Number state
  selectedCurrency = 'USD';
  currencyCodes = ['USD', 'EUR', 'GBP', 'INR', 'JPY'];
  currencyDisplay: 'symbol' | 'code' | 'symbol-narrow' = 'symbol';
  rawNumber = 1245678.9254;
  numberFormat = '1.2-2';

  // Slice state
  sliceStart = 0;
  sliceEnd = 3;

  // KeyValue demo object
  serverConfig: Record<string, string | number | boolean> = {
    clusterName: 'eu-central-prod-01',
    nodes: 8,
    loadBalancing: true,
    region: 'Frankfurt',
    uptimeHours: 99.98
  };

  // Sample Products
  products: ProductItem[] = [
    {
      id: 'PRD-01',
      name: 'angular reactive architecture handbook',
      category: 'Books',
      price: 49.99,
      discountRate: 0.15,
      releaseDate: new Date(2024, 5, 15),
      rating: 4.9,
      inStock: true
    },
    {
      id: 'PRD-02',
      name: 'wireless noise-canceling developer headset',
      category: 'Electronics',
      price: 299.00,
      discountRate: 0.20,
      releaseDate: new Date(2024, 7, 22),
      rating: 4.75,
      inStock: true
    },
    {
      id: 'PRD-03',
      name: 'mechanical ergonomic keyboard with rgb',
      category: 'Peripherals',
      price: 189.50,
      discountRate: 0.05,
      releaseDate: new Date(2024, 2, 10),
      rating: 4.85,
      inStock: false
    },
    {
      id: 'PRD-04',
      name: 'ultra-wide 4k curved monitor 34-inch',
      category: 'Displays',
      price: 799.99,
      discountRate: 0.12,
      releaseDate: new Date(2024, 8, 5),
      rating: 4.95,
      inStock: true
    },
    {
      id: 'PRD-05',
      name: 'standing desk with memory presets',
      category: 'Furniture',
      price: 520.00,
      discountRate: 0.25,
      releaseDate: new Date(2024, 1, 18),
      rating: 4.6,
      inStock: true
    }
  ];

  get parsedDate(): Date {
    return new Date(this.selectedDate);
  }
}
