import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileSize',
  standalone: true
})
export class FileSizePipe implements PipeTransform {
  private readonly units = ['B', 'KB', 'MB', 'GB', 'TB'];

  transform(bytes: number | null | undefined, precision = 2): string {
    if (bytes === null || bytes === undefined || isNaN(bytes)) return '0 B';
    if (bytes === 0) return '0 B';

    const k = 1024;
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const size = bytes / Math.pow(k, i);

    return `${size.toFixed(precision)} ${this.units[i] || 'B'}`;
  }
}
