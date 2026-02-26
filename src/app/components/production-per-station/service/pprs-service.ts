import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { ProductionPerStationData } from '../model/model';

@Injectable({
  providedIn: 'root',
})
export class PprsService {
  constructor(private http: HttpClient) {}
  urlPPSR = environment.apiReports + '/ProductionLineOverview/PerStationAndSide';
  getDataPPSR(startTime:string | Date, endTime:string | Date, project:string):Observable<ProductionPerStationData[]> {
    const url = `${this.urlPPSR}?startTime=${startTime}&endTime=${endTime}&project=${project}`;
    return this.http.get<ProductionPerStationData[]>(url);
  }
}
