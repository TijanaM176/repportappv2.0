// Widget Model
export type WidgetType = 'table' | 'chart' | 'stats' | 'heatmap' | 'timeline';

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
}

export interface IWidgetData {
  reportId: string;
  lineId: string;
  startDate?: Date;
  endDate?: Date;
}
