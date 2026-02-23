export interface ReportData{
  name: string;
  value:number;
  selectedValue: boolean;
}
export interface ProductionLine{
  id:number,
  project:string,
  description:string,
  qadName:string,
  startDate:Date | string,
  endDate:Date | string 
  isActive:number
}
export interface TimeOption {
    title: string;
}