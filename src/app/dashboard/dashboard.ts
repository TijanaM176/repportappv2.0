import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GridsterConfig, GridsterModule } from 'angular-gridster2';
import { SideMenuComponent } from '../components/side-menu/side-menu.component';
import { WidgetTableComponent } from '../widgets/widget-table/widget-table.component';
import { WidgetStatsComponent } from '../widgets/widget-stats/widget-stats.component';
import { WidgetChartComponent } from '../widgets/widget-chart/widget-chart.component';
import { FilterStateService } from '../services/filter-state.service';
import { ReportService } from '../services/report.service';
import { IWidget } from '../models/widget.model';

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
    WidgetChartComponent
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class Dashboard implements OnInit {
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
    newWidgetType: 'table' | 'chart' | 'stats' = 'table';
    newWidgetCols: number = 2;
  options!: GridsterConfig;
  widgets: IWidget[] = [];
  sidebarMargin = '64px';

  constructor(
    private filterState: FilterStateService,
    private reportService: ReportService
  ) {
    this.options = {
      draggable: { enabled: true },
      resizable: { enabled: true },
      swap: false,
      pushItems: true,
      maxCols: 4,
      minCols: 1,
      defaultItemCols: 2,
      defaultItemRows: 1,
    };
  }

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
      .subscribe(widgets => {
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

  confirmAddWidget() {
    const newWidget: IWidget = {
      id: 'widget-' + Date.now(),
      reportId: this.filterState.getSelectedReport() || '',
      type: this.newWidgetType,
      title: 'New Widget',
      cols: this.newWidgetCols,
      rows: 1,
      x: 0,
      y: this.widgets.length
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