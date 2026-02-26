import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { StatsData } from './widget-stats.model';

@Injectable({
  providedIn: 'root'
})
export class WidgetStatsService {

  getStatsData(reportId: string, lineId: string): Observable<StatsData> {
    // Mock data - kasnije zamjena sa API pozivom
    const mockData: StatsData = {
      stats: [
        { label: 'Total Production', value: 5250, unit: 'units', trend: 'up', percentChange: 12 },
        { label: 'Efficiency', value: 94.5, unit: '%', trend: 'neutral', percentChange: 0 },
        { label: 'Downtime', value: 45, unit: 'min', trend: 'down', percentChange: -8 },
        { label: 'Quality Rate', value: 98.2, unit: '%', trend: 'up', percentChange: 2.5 }
      ]
    };

    return of(mockData);
  }
}
