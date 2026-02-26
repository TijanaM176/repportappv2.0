import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IWidget } from '../../models/widget.model';
import { WidgetTableService } from './widget-table.service';
import { TableData } from './widget-table.model';

@Component({
  selector: 'app-widget-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="widget-table">
      <div class="table-header">
        <h3>{{ widget.title }}</h3>
      </div>
      <div class="table-content">
        <table *ngIf="tableData">
          <thead>
            <tr>
              <th *ngFor="let col of tableData.columns">{{ col }}</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let row of tableData.rows" [class]="'status-' + row.status.toLowerCase()">
              <td>{{ row.id }}</td>
              <td>{{ row.value }}</td>
              <td><span class="status-badge">{{ row.status }}</span></td>
              <td>{{ row.timestamp | date:'short' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .widget-table {
      padding: 16px;
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .table-header h3 {
      margin: 0;
      color: #0f172a;
      font-size: 1rem;
      margin-bottom: 12px;
    }

    .table-content {
      flex: 1;
      overflow: auto;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.85rem;
    }

    thead {
      background: #f0fdfa;
      position: sticky;
      top: 0;
    }

    th {
      padding: 8px;
      text-align: left;
      font-weight: 600;
      color: #0f766e;
      border-bottom: 2px solid #cbd5e1;
    }

    td {
      padding: 8px;
      border-bottom: 1px solid #e2e8f0;
      color: #475569;
    }

    tr:hover {
      background: #f8fafc;
    }

    .status-badge {
      display: inline-block;
      padding: 4px 8px;
      border-radius: 4px;
      font-weight: 600;
      font-size: 0.75rem;
    }

    .status-ok .status-badge {
      background: #dcfce7;
      color: #166534;
    }

    .status-warning .status-badge {
      background: #fef3c7;
      color: #92400e;
    }

    .status-error .status-badge {
      background: #fee2e2;
      color: #991b1b;
    }
  `]
})
export class WidgetTableComponent implements OnInit {
  @Input() widget!: IWidget;
  
  tableData: TableData | null = null;

  constructor(private tableService: WidgetTableService) {}

  ngOnInit() {
    this.tableService.getTableData(this.widget.reportId, 'IMM')
      .subscribe(data => {
        this.tableData = data;
      });
  }
}
