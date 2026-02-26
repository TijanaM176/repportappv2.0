import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IWidget } from '../../models/widget.model';
import { WidgetStatsService } from './widget-stats.service';
import { StatsData } from './widget-stats.model';

@Component({
  selector: 'app-widget-stats',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="widget-stats">
      <div class="stats-header">
        <h3>{{ widget.title }}</h3>
      </div>
      <div class="stats-grid" *ngIf="statsData">
        <div class="stat-item" *ngFor="let stat of statsData.stats">
          <div class="stat-value">{{ stat.value }}</div>
          <div class="stat-unit">{{ stat.unit }}</div>
          <div class="stat-label">{{ stat.label }}</div>
          <div *ngIf="stat.percentChange" [class]="'trend ' + (stat.trend || 'neutral')">
            {{ stat.percentChange > 0 ? '+' : '' }}{{ stat.percentChange }}%
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .widget-stats {
      padding: 16px;
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .stats-header h3 {
      margin: 0;
      color: #0f172a;
      font-size: 1rem;
      margin-bottom: 12px;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
      gap: 12px;
      flex: 1;
    }

    .stat-item {
      background: linear-gradient(135deg, #f0fdfa 0%, #f8fafc 100%);
      border: 1px solid #cbd5e1;
      border-left: 4px solid #14b8a6;
      border-radius: 6px;
      padding: 12px;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 4px;
    }

    .stat-value {
      font-size: 1.4rem;
      font-weight: 700;
      color: #0d9488;
    }

    .stat-unit {
      font-size: 0.75rem;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .stat-label {
      font-size: 0.8rem;
      color: #475569;
      font-weight: 500;
    }

    .trend {
      font-size: 0.75rem;
      font-weight: 600;
      margin-top: 4px;
      padding-top: 4px;
      border-top: 1px solid #e2e8f0;
    }

    .trend.up {
      color: #16a34a;
    }

    .trend.down {
      color: #dc2626;
    }

    .trend.neutral {
      color: #64748b;
    }
  `]
})
export class WidgetStatsComponent implements OnInit {
  @Input() widget!: IWidget;
  
  statsData: StatsData | null = null;

  constructor(private statsService: WidgetStatsService) {}

  ngOnInit() {
    this.statsService.getStatsData(this.widget.reportId, 'IMM')
      .subscribe(data => {
        this.statsData = data;
      });
  }
}
