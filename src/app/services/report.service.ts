import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IReport, REPORT_CONFIG } from '../models/report.model';
import { IWidget, WidgetType } from '../models/widget.model';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  getReportsByLine(lineId: string): Observable<IReport[]> {
    const reports = REPORT_CONFIG[lineId] || [];
    return of(reports);
  }

  getDefaultWidgetsByReport(reportId: string): Observable<IWidget[]> {
    // Pronađi report i kreiraj default widget-e
    for (const line in REPORT_CONFIG) {
      const report = REPORT_CONFIG[line].find(r => r.id === reportId);
      if (report) {
        const widgets: IWidget[] = report.defaultWidgets.map((type, idx) => ({
          id: `${reportId}-${type}-${idx}`,
          reportId: reportId,
          type: type as WidgetType,
          title: this.getWidgetTitle(type as WidgetType),
          cols: 2,
          rows: 1,
          x: (idx % 2) * 2,
          y: Math.floor(idx / 2)
        }));
        return of(widgets);
      }
    }
    return of([]);
  }

  private getWidgetTitle(type: WidgetType): string {
    const titles: { [key in WidgetType]: string } = {
      table: 'Data Table',
      chart: 'Production Chart',
      stats: 'Key Statistics',
      heatmap: 'Efficiency Heatmap',
      timeline: 'Timeline View'
    };
    return titles[type];
  }
}
