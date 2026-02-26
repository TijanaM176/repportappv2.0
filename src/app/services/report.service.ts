import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IWidget } from '../models/widget.model';

@Injectable({ providedIn: 'root' })
export class ReportService {
  getDefaultWidgetsByReport(reportId: string): Observable<IWidget[]> {
    // Stub: return empty array or mock widgets
    return of([]);
  }
}
