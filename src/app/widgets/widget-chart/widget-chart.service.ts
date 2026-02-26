import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ChartData } from './widget-chart.model';

@Injectable({
  providedIn: 'root'
})
export class WidgetChartService {

  getChartData(reportId: string, lineId: string): Observable<ChartData> {
    // Mock data - kasnije zamjena sa API pozivom
    const mockData: ChartData = {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          label: 'Production',
          data: [950, 1100, 1050, 1200, 1150, 1000, 850],
          borderColor: '#14b8a6',
          backgroundColor: 'rgba(20, 184, 166, 0.1)'
        },
        {
          label: 'Target',
          data: [1000, 1000, 1000, 1000, 1000, 1000, 1000],
          borderColor: '#2563eb',
          backgroundColor: 'rgba(37, 99, 235, 0.1)'
        }
      ]
    };

    return of(mockData);
  }
}
