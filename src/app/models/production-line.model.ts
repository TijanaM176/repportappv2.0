// Production Line Model
export interface IProductionLine {
  id: string;
  name: string;
  description?: string;
}

export interface IProductionLineGroup {
  name: string;
  children: IProductionLine[];
}

export const PRODUCTION_LINES: IProductionLineGroup[] = [
  {
    name: 'Assembly',
    children: [
      { id: 'IMM', name: 'IMM' },
      { id: 'ASSY', name: 'ASSY' }
    ]
  },
  {
    name: 'Cutting',
    children: [
      { id: 'CUTTING_PVC', name: 'Cutting PVC' },
      { id: 'CUTTING_RL', name: 'Cutting RL' }
    ]
  }
];

// Time Range Model
export interface ITimeRange {
  id: string;
  title: string;
}

export const TIME_RANGES: ITimeRange[] = [
  { id: 'today', title: 'Today' },
  { id: 'week', title: 'This Week' },
  { id: 'month', title: 'This Month' },
  { id: 'custom', title: 'Custom Range' }
];
