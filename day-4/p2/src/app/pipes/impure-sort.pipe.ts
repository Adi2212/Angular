import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'impureSort',
  standalone: true,
  pure: false // IMPURE: Re-executes on every change detection cycle
})
export class ImpureSortPipe implements PipeTransform {
  static executionCount = 0;

  transform<T>(
    value: T[] | null | undefined,
    direction: 'asc' | 'desc' = 'asc',
    property?: keyof T
  ): T[] {
    ImpureSortPipe.executionCount++;

    if (!value || !Array.isArray(value)) {
      return [];
    }

    const sorted = [...value].sort((a: any, b: any) => {
      const valA = property ? a[property] : a;
      const valB = property ? b[property] : b;

      if (typeof valA === 'string' && typeof valB === 'string') {
        return direction === 'asc'
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      }

      if (valA < valB) return direction === 'asc' ? -1 : 1;
      if (valA > valB) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    return sorted;
  }
}
