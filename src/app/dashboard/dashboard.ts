import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GridsterConfig, GridsterModule } from 'angular-gridster2';
import { SideMenuComponent } from '../components/side-menu/side-menu.component';
import { WidgetTableComponent } from '../widgets/widget-table/widget-table.component';
import { WidgetStatsComponent } from '../widgets/widget-stats/widget-stats.component';
import { WidgetChartComponent } from '../widgets/widget-chart/widget-chart.component';
import { Chart } from '../components/production-per-station/chart/chart';
import { Table } from '../components/production-per-station/table/table';
import { Info } from '../components/production-per-station/info/info';
import { FilterStateService } from '../services/filter-state.service';
import { ReportService } from '../services/report.service';
import { IWidget } from '../models/widget.model';
import { PprsService } from '../components/production-per-station/service/pprs-service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    GridsterModule,
    SideMenuComponent,
    WidgetTableComponent,
    WidgetStatsComponent,
    WidgetChartComponent,
    Chart,
    Table,
    Info
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class Dashboard implements OnInit {
          ppsData: any[] = [];
          ppsChartData: any[] = [];
          ppsOkCount: number = 0;
          ppsNokCount: number = 0;
          ppsReworkCount: number = 0;

  constructor(
    private filterState: FilterStateService,
    private reportService: ReportService,
    private pprsService: PprsService
  ) {
    this.options = {
      draggable: { enabled: true },
      resizable: { enabled: true },
      swap: false,
      pushItems: true,
      maxCols: 6, 
      minCols: 6,
      maxRows: 4,
      minRows: 4,
      defaultItemCols: 2,
      defaultItemRows: 1,
      fixedColWidth: undefined,
      fixedRowHeight: undefined,
    };
    this.fetchPPSData();
  }

          fetchPPSData() {
            this.pprsService.getDataPPSR('2026-02-24','2026-02-25','BR223_MC').subscribe((response: any[]) => {
              this.ppsData = response;
              this.ppsOkCount = this.ppsData.filter(d => d.partStatus === 'OK').reduce((sum, d) => sum + d.partCount, 0);
              this.ppsNokCount = this.ppsData.filter(d => d.partStatus === 'NOK').reduce((sum, d) => sum + d.partCount, 0);
              this.ppsReworkCount = this.ppsData.filter(d => d.partStatus === 'REWORK').reduce((sum, d) => sum + d.partCount, 0);
              this.preparePPSChartData();
            });
          }

          preparePPSChartData() {
            const stationData = this.ppsData.reduce((acc: any, d: any) => {
              if (!acc[d.stationName]) {
                acc[d.stationName] = { OK: 0, NOK: 0, REWORK: 0 };
              }
              acc[d.stationName][d.partStatus] += d.partCount;
              return acc;
            }, {});
            this.ppsChartData = Object.keys(stationData).map(station => ({
              stationName: station,
              OK: stationData[station].OK,
              NOK: stationData[station].NOK,
              REWORK: stationData[station].REWORK
            }));
          }
      fitContent() {
        setTimeout(() => {
          if (this.options?.api?.resize) {
            this.options.api.resize();
          }
          if (this.options?.api?.optionsChanged) {
            this.options.api.optionsChanged();
          }
        }, 0);
      }
    showAddWidgetModal = false;
    newWidgetType: 'table' | 'chart' | 'stats' | 'pps-chart' | 'pps-table' | 'pps-info' = 'table';
    newWidgetCols: number = 2;
  options!: GridsterConfig;
  widgets: IWidget[] = [];
  sidebarMargin = '64px';


  ngOnInit() {
    this.filterState.selectedReport$.subscribe(reportId => {
      if (reportId) {
        this.loadWidgetsForReport(reportId);
      }
    });

    const firstLine = this.filterState.groupedLines[0]?.children[0];
    if (firstLine) {
      this.filterState.setSelectedLine(firstLine);
    }
  }

  private loadWidgetsForReport(reportId: string) {
    this.reportService.getDefaultWidgetsByReport(reportId)
      .subscribe((widgets: IWidget[]) => {
        this.widgets = widgets;
        this.updateGridOptions();
      });
  }

  private updateGridOptions() {
    if (this.options?.api) {
      this.options.api.optionsChanged?.();
    }
  }

  removeWidget(widget: IWidget) {
    const idx = this.widgets.findIndex(w => w.id === widget.id);
    if (idx >= 0) {
      this.widgets.splice(idx, 1);
      this.updateGridOptions();
      this.fitContent();
    }
  }

  addWidget() {
    this.showAddWidgetModal = true;
  }


  getWidgetTitle(type: string): string {
    switch(type) {
      case 'table': return 'Table';
      case 'chart': return 'Chart';
      case 'stats': return 'Stats';
      case 'pps-chart': return 'PPS Chart';
      case 'pps-table': return 'PPS Table';
      case 'pps-info': return 'PPS Info';
      default: return 'Widget';
    }
  }

  confirmAddWidget() {
    let widgetData: any = null;
    if (this.newWidgetType === 'pps-chart') {
      widgetData = this.ppsChartData;
    } else if (this.newWidgetType === 'pps-table') {
      widgetData = this.ppsData;
    } else if (this.newWidgetType === 'pps-info') {
      widgetData = { okCount: this.ppsOkCount, nokCount: this.ppsNokCount, reworkCount: this.ppsReworkCount };
    }
    let widgetCols = 2;
    let widgetRows = 1;
    switch (this.newWidgetType) {
      case 'table':
        widgetCols = 3; widgetRows = 2; break;
      case 'chart':
        widgetCols = 3; widgetRows = 2; break;
      case 'stats':
        widgetCols = 2; widgetRows = 1; break;
      case 'pps-chart':
        widgetCols = 3; widgetRows = 2; break;
      case 'pps-table':
        widgetCols = 3; widgetRows = 2; break;
      case 'pps-info':
        widgetCols = 2; widgetRows = 1; break;
      default:
        widgetCols = 2; widgetRows = 1;
    }
    const newWidget: IWidget = {
      id: 'widget-' + Date.now(),
      reportId: this.filterState.getSelectedReport() || '',
      type: this.newWidgetType,
      title: this.getWidgetTitle(this.newWidgetType),
      cols: widgetCols,
      rows: widgetRows,
      x: 0,
      y: this.widgets.length,
      data: widgetData,
      minItemCols: widgetCols,
      maxItemCols: widgetCols,
      minItemRows: widgetRows,
      maxItemRows: widgetRows
    };
    this.widgets.push(newWidget);
    this.updateGridOptions();
    this.fitContent();
    this.showAddWidgetModal = false;
    this.newWidgetType = 'table';
    this.newWidgetCols = 2;
  }

  cancelAddWidget() {
    this.showAddWidgetModal = false;
  }

  changedOptions() {
    this.options?.api?.optionsChanged?.();
  }

  onSidebarStateChanged(isExpanded: boolean) {
    this.sidebarMargin = isExpanded ? '360px' : '64px';
  }
}