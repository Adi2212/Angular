import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBy',
  standalone: true
})
export class FilterPipe implements PipeTransform {
  transform<T>(
    items: T[] | null | undefined,
    searchTerm: string,
    property?: keyof T
  ): T[] {
    if (!items || !Array.isArray(items)) return [];
    if (!searchTerm || !searchTerm.trim()) return items;

    const term = searchTerm.toLowerCase().trim();

    return items.filter((item: any) => {
      if (property && item[property] !== undefined && item[property] !== null) {
        return String(item[property]).toLowerCase().includes(term);
      }
      return Object.values(item).some((val) =>
        String(val).toLowerCase().includes(term)
      );
    });
  }
}
