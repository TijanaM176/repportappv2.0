// Report Model
export interface IReport {
  id: string;
  name: string;
  lineId: string;
  defaultWidgets: string[]; // widget type ids
  description?: string;
}

// Report Configuration by Production Line
export const REPORT_CONFIG: { [lineId: string]: IReport[] } = {
  IMM: [
    {
      id: 'imm-daily',
      name: 'Daily Report',
      lineId: 'IMM',
      defaultWidgets: ['table', 'stats'],
      description: 'Daily production summary'
    },
    {
      id: 'imm-detailed',
      name: 'Detailed Analysis',
      lineId: 'IMM',
      defaultWidgets: ['chart'],
      description: 'Detailed production metrics'
    }
  ],
  ASSY: [
    {
      id: 'assy-daily',
      name: 'Daily Report',
      lineId: 'ASSY',
      defaultWidgets: ['table', 'stats'],
      description: 'Daily assembly summary'
    }
  ],
  CUTTING_PVC: [
    {
      id: 'cutting-pvc-daily',
      name: 'Daily Report',
      lineId: 'CUTTING_PVC',
      defaultWidgets: ['stats', 'chart'],
      description: 'PVC cutting production'
    }
  ],
  CUTTING_RL: [
    {
      id: 'cutting-rl-daily',
      name: 'Daily Report',
      lineId: 'CUTTING_RL',
      defaultWidgets: ['table', 'chart'],
      description: 'RL cutting production'
    }
  ]
};
