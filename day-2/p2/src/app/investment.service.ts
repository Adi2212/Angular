import { Injectable, signal } from '@angular/core';
import { InvestmentInput, InvestmentResult } from './investment.model';
import { calculateInvestmentResults } from '../investment-results';

@Injectable({
  providedIn: 'root'
})
export class InvestmentService {
  resultsData = signal<InvestmentResult[] | undefined>(undefined);

  calculateInvestmentResults(data: InvestmentInput): void {
    const results = calculateInvestmentResults(data);
    this.resultsData.set(results);
  }
}
