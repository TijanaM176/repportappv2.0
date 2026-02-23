import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IWidget } from '../../models/widget.model';
import { WidgetChartService } from './widget-chart.service';
import { ChartData } from './widget-chart.model';

@Component({
  selector: 'app-widget-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="widget-chart">
      <div class="chart-header">
        <h3>{{ widget.title }}</h3>
      </div>
      <div class="chart-placeholder" *ngIf="chartData">
        <p>📊 Chart will render here (integrate Chart.js or ECharts)</p>
        <div class="chart-info">
          <p><strong>Labels:</strong> {{ chartData.labels.join(', ') }}</p>
          <p><strong>Datasets:</strong> {{ chartData.datasets.length }}</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .widget-chart {
      padding: 16px;
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .chart-header h3 {
      margin: 0;
      color: #0f172a;
      font-size: 1rem;
      margin-bottom: 12px;
    }

    .chart-placeholder {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #f0fdfa 0%, #f8fafc 100%);
      border: 2px dashed #cbd5e1;
      border-radius: 6px;
      padding: 12px;
      text-align: center;
    }

    .chart-placeholder p {
      margin: 4px 0;
      color: #64748b;
      font-size: 0.9rem;
    }

    .chart-info {
      margin-top: 8px;
      font-size: 0.8rem;
      color: #475569;
    }
  `]
})
export class WidgetChartComponent implements OnInit {
  @Input() widget!: IWidget;
  
  chartData: ChartData | null = null;

  constructor(private chartService: WidgetChartService) {}

  ngOnInit() {
    this.chartService.getChartData(this.widget.reportId, 'IMM')
      .subscribe(data => {
        this.chartData = data;
      });
  }
}
