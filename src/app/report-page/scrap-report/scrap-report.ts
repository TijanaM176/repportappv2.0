import { Component, Input, OnInit, OnChanges, SimpleChanges, ChangeDetectorRef, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { TagModule } from 'primeng/tag';
import { SkeletonModule } from 'primeng/skeleton';
import { CardModule } from 'primeng/card';
import { ScrapReportService } from './scrap-report-service/scrap-report-service';
@Component({
  selector: 'app-scrap-report',
  standalone: true,
  imports: [
    CommonModule, 
    ButtonModule, 
    ChartModule, 
    TagModule, 
    SkeletonModule, 
    CardModule, 
    TableModule
  ],
  templateUrl: './scrap-report.html',
  styleUrls: ['./scrap-report.css']
})
export class ScrapReportComponent{
 constructor(private scrapReportService:ScrapReportService,private cd:ChangeDetectorRef) {
  
 }
}