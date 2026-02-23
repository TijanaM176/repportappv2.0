import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { Dashboard } from './dashboard/dashboard';
import { ReportPage } from './report-page/report-page';

export const routes: Routes = [
    {path:'login',component:LoginComponent},
    {path:'dashboard',component:Dashboard},
    {path:'report-page',component:ReportPage},
    {path:'',redirectTo:'dashboard',pathMatch:'full'}

];
