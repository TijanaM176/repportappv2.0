import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridsterConfig, GridsterItem, GridsterModule }  from 'angular-gridster2';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, GridsterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  options!: GridsterConfig;
  dashboard!: Array<GridsterItem>;

  ngOnInit() {
    this.options = {
      draggable: {
        enabled: true,
      },
      swap: false,
      pushItems: true,
      maxCols: 4
    };

    this.dashboard = [
      {cols: 2, rows: 1, y: 0, x: 0},
      {cols: 2, rows: 2, y: 0, x: 2},
      {cols: 1, rows: 1, y: 0, x: 4},
      {cols: 1, rows: 1, y: 2, x: 5},
      {cols: 1, rows: 1, y: 1, x: 0},
      {cols: 1, rows: 1, y: 1, x: 0},
      {cols: 2, rows: 2, y: 3, x: 5},
      {cols: 2, rows: 2, y: 2, x: 0},
      {cols: 2, rows: 1, y: 2, x: 2},
      {cols: 1, rows: 1, y: 2, x: 4},
      {cols: 1, rows: 1, y: 2, x: 6}
    ];
  }

  changedOptions() {
    this.options?.api?.optionsChanged?.();
  }

  removeItem(item: GridsterItem) {
    this.dashboard.splice(this.dashboard.indexOf(item), 1);
  }

  addItem() {
    const item: GridsterItem = { cols: 2, rows: 2, y: 0, x: 2 };
    this.dashboard.push(item);
  }
}