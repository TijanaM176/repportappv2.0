import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FilterStateService {
  selectedReport$ = new BehaviorSubject<string>('');
  groupedLines: any[] = [];

  getSelectedReport(): string {
    return this.selectedReport$.value;
  }

  setSelectedLine(line: any) {
    // Stub: implement as needed
  }
}
