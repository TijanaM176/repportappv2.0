// Widget Table Model
export interface TableRow {
  id: string;
  value: number;
  status: 'OK' | 'WARNING' | 'ERROR';
  timestamp: Date;
}

export interface TableData {
  columns: string[];
  rows: TableRow[];
}
