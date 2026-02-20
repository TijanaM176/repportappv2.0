import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductionLine, ReportData, Station, TimeOption } from '../../models/models';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private dataUrlTime = environment.assets+'time.json';
  private dataURLProdLines=environment.api+'/Project/GetAllProductionLines';
  private dataUrlReports = environment.assets+'reports.json';
  private dataURLStations=environment.api+'/Project/GetWorkStationsPerProductionLine?productionLineId=';
  constructor(private http: HttpClient) { } 
  getProductionLines(): Observable<ProductionLine[]> {
    //return this.http.get<ProductionLines[]>(this.dataUrlProductionLines);
    return this.http.get<ProductionLine[]>(this.dataURLProdLines);
  }
  getTimeData(): Observable<TimeOption[]> {
    return this.http.get<TimeOption[]>(this.dataUrlTime);
  }
  getReports(): Observable<ReportData[]> {
    return this.http.get<ReportData[]>(this.dataUrlReports);
  }
  getStationsPerProdLine(id:number): Observable<Station[]>{
    return this.http.get<Station[]>(this.dataURLStations+''+id);
  }
}
