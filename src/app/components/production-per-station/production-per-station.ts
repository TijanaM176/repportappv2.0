import { Component } from '@angular/core';
import { Info } from './info/info';
import { Table } from './table/table';
import { Chart } from './chart/chart';
import { ProductionPerStationData } from './model/model';
import { PprsService } from './service/pprs-service';

@Component({
  selector: 'app-production-per-station',
  imports: [Info,Table,Chart],
  templateUrl: './production-per-station.html',
  styleUrl: './production-per-station.css',
})
export class ProductionPerStation {
  nokCount: number = 0;
  okCount: number = 0
  reworkCount: number = 0;
  data: ProductionPerStationData[] = [];
  chartData: any = {};
  constructor(private service:PprsService){
    this.fetchData();
  }
  fetchData() {
    this.service.getDataPPSR('2026-02-24','2026-02-25','BR223_MC').subscribe((response) => {
      this.data = response;
      this.okCount = this.data.filter(d => d.partStatus === 'OK').reduce((sum, d) => sum + d.partCount, 0);
      this.nokCount = this.data.filter(d => d.partStatus === 'NOK').reduce((sum, d) => sum + d.partCount, 0);
      this.reworkCount = this.data.filter(d => d.partStatus === 'REWORK').reduce((sum, d) => sum + d.partCount, 0);
      this.prepareChartData();
    });
  }
  prepareChartData() {
 
    const stationData = this.data.reduce((acc: any, d) => {
      if (!acc[d.stationName]) {
        acc[d.stationName] = { OK: 0, NOK: 0, REWORK: 0 };
      }
      acc[d.stationName][d.partStatus] += d.partCount;
      return acc;
    }, {});

    this.chartData = Object.keys(stationData).map(station => ({
      stationName: station,
      OK: stationData[station].OK,
      NOK: stationData[station].NOK,
      REWORK: stationData[station].REWORK
    }));
  }
}
