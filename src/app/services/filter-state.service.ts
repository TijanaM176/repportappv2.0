import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IProductionLine, PRODUCTION_LINES, TIME_RANGES, ITimeRange } from '../models/production-line.model';

@Injectable({
  providedIn: 'root'
})
export class FilterStateService {
  
  private selectedLineSubject = new BehaviorSubject<IProductionLine | null>(null);
  public selectedLine$ = this.selectedLineSubject.asObservable();

  private selectedReportSubject = new BehaviorSubject<string | null>(null);
  public selectedReport$ = this.selectedReportSubject.asObservable();

  private selectedTimeSubject = new BehaviorSubject<ITimeRange>(TIME_RANGES[0]);
  public selectedTime$ = this.selectedTimeSubject.asObservable();

  private startDateSubject = new BehaviorSubject<Date | null>(null);
  public startDate$ = this.startDateSubject.asObservable();

  private endDateSubject = new BehaviorSubject<Date | null>(null);
  public endDate$ = this.endDateSubject.asObservable();

  groupedLines = PRODUCTION_LINES;
  timeRanges = TIME_RANGES;

  setSelectedLine(line: IProductionLine | null) {
    this.selectedLineSubject.next(line);
  }

  setSelectedReport(reportId: string | null) {
    this.selectedReportSubject.next(reportId);
  }

  setSelectedTime(time: ITimeRange) {
    this.selectedTimeSubject.next(time);
  }

  setStartDate(date: Date | null) {
    this.startDateSubject.next(date);
  }

  setEndDate(date: Date | null) {
    this.endDateSubject.next(date);
  }

  getSelectedLine() {
    return this.selectedLineSubject.value;
  }

  getSelectedReport() {
    return this.selectedReportSubject.value;
  }

  getSelectedTime() {
    return this.selectedTimeSubject.value;
  }
}
