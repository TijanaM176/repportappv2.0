import { Component, Input } from '@angular/core';
import { ChartType, ChartData } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
@Component({
  selector: 'app-chart',
  imports: [NgChartsModule],
  templateUrl: './chart.html',
  styleUrl: './chart.css',
})
export class Chart {
  @Input() chartData: any[] = [];

  barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      { data: [], label: 'OK', backgroundColor: '#4caf50' },
      { data: [], label: 'NOK', backgroundColor: '#f44336' },
      { data: [], label: 'REWORK', backgroundColor: '#ff9800' }
    ]
  };
  barChartType: ChartType = 'bar';
  barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: true } },
    layout: { padding: 0 }
  };

  ngOnChanges() {
    this.barChartData.labels = this.chartData.map(d => d.stationName);
    this.barChartData.datasets[0].data = this.chartData.map(d => d.OK);
    this.barChartData.datasets[1].data = this.chartData.map(d => d.NOK);
    this.barChartData.datasets[2].data = this.chartData.map(d => d.REWORK);
  }
}
