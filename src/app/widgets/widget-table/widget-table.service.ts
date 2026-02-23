import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TableData, TableRow } from './widget-table.model';

@Injectable({
  providedIn: 'root'
})
export class WidgetTableService {

  getTableData(reportId: string, lineId: string): Observable<TableData> {
    // Mock data - kasnije zamjena sa API pozivom
    const mockData: TableData = {
      columns: ['ID', 'Value', 'Status', 'Time'],
      rows: [
        { id: 'WID-001', value: 950, status: 'OK', timestamp: new Date() },
        { id: 'WID-002', value: 850, status: 'WARNING', timestamp: new Date(Date.now() - 3600000) },
        { id: 'WID-003', value: 1200, status: 'OK', timestamp: new Date(Date.now() - 7200000) },
        { id: 'WID-004', value: 500, status: 'ERROR', timestamp: new Date(Date.now() - 10800000) },
        { id: 'WID-005', value: 1100, status: 'OK', timestamp: new Date(Date.now() - 14400000) }
      ]
    };

    return of(mockData);
  }
}
