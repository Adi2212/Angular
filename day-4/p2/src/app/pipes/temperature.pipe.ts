import { Pipe, PipeTransform } from '@angular/core';

export type TempUnit = 'C' | 'F';

@Pipe({
  name: 'temperature',
  standalone: true
})
export class TemperaturePipe implements PipeTransform {
  transform(
    value: string | number | null | undefined,
    inputType: TempUnit = 'C',
    outputType?: TempUnit,
    precision = 1
  ): string {
    if (value === null || value === undefined || value === '') {
      return '';
    }

    const numericVal = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(numericVal)) {
      return 'Invalid Temp';
    }

    // Default target unit: convert C -> F or F -> C
    const targetUnit = outputType ?? (inputType === 'C' ? 'F' : 'C');

    let outputTemp: number;

    if (inputType === 'C' && targetUnit === 'F') {
      // Celsius to Fahrenheit: (C * 9/5) + 32
      outputTemp = (numericVal * 9) / 5 + 32;
    } else if (inputType === 'F' && targetUnit === 'C') {
      // Fahrenheit to Celsius: (F - 32) * 5/9
      outputTemp = ((numericVal - 32) * 5) / 9;
    } else {
      outputTemp = numericVal;
    }

    return `${outputTemp.toFixed(precision)} °${targetUnit}`;
  }
}
