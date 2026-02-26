
import { Component, Input } from '@angular/core';
import { PprsService } from '../service/pprs-service';
import { CommonModule } from '@angular/common';
import { ProductionPerStationData } from '../model/model';

@Component({
  selector: 'app-table',
  imports: [CommonModule],
  templateUrl: './table.html',
  styleUrls:  ['./table.css'] ,
})
export class Table {
  constructor(private service:PprsService){}
  @Input() data: ProductionPerStationData[] = [];

}
