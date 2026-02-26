// Widget Model
export type WidgetType = 'table' | 'chart' | 'stats' | 'heatmap' | 'timeline' | 'pps-chart' | 'pps-table' | 'pps-info';

export interface IWidget {
  id: string;
  reportId: string;
  type: WidgetType;
  title: string;
  cols: number;
  rows: number;
  x: number;
  y: number;
  data?: any;
  minItemCols?: number;
  maxItemCols?: number;
  minItemRows?: number;
  maxItemRows?: number;
}

export interface IWidgetData {
  reportId: string;
  lineId: string;
  startDate?: Date;
  endDate?: Date;
}
