import { Routes } from '@angular/router';
import { ScrapReportComponent } from './report-page/scrap-report/scrap-report';
import { ReportPage } from './report-page/report-page';

export const routes: Routes = [
    {path:'report-page',component:ReportPage},
    {path:'',redirectTo:'report-page',pathMatch:'full'}

];
