import { Routes } from '@angular/router';
import { ScrapReportComponent } from './report-page/scrap-report/scrap-report';
import { ReportPage } from './report-page/report-page';
import { LoginComponent } from './login/login';

export const routes: Routes = [
    {path:'login',component:LoginComponent},
    {path:'report-page',component:ReportPage},
    {path:'',redirectTo:'login',pathMatch:'full'}

];
