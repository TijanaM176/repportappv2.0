// Widget Stats Model
export interface Stat {
  label: string;
  value: number;
  unit: string;
  trend?: 'up' | 'down' | 'neutral';
  percentChange?: number;
}

export interface StatsData {
  stats: Stat[];
}
