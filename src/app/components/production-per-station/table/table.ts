import { Component } from '@angular/core';
import { PprsService } from '../service/pprs-service';

@Component({
  selector: 'app-table',
  imports: [],
  templateUrl: './table.html',
  styleUrls:  ['./table.css'] ,
})
export class Table {
    constructor(private service:PprsService){}

    ngOnInit(): void {
        const startTime = new Date('2024-01-01T00:00:00');
        const endTime = new Date('2024-01-31T23:59:59');
        const project = 'BR223_MC';
        this.service.getDataPPSR(startTime, endTime, project).subscribe(data => {
            console.log(data);
        });
    }
}
