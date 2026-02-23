import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IProductionLine, IProductionLineGroup } from '../../models/production-line.model';
import { IReport } from '../../models/report.model';
import { ChangeDetectorRef, signal } from '@angular/core';
import moment from 'moment';
import { SelectButton } from 'primeng/selectbutton';
import { Button } from 'primeng/button';
import { CascadeSelect } from 'primeng/cascadeselect';
import { DatePicker } from 'primeng/datepicker';
import { Dialog } from 'primeng/dialog';
import { Select } from "primeng/select";
import { ProductionLine, ReportData, TimeOption } from './side-model';
import { SideService } from './side-service';
@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [CommonModule, FormsModule,CascadeSelect, DatePicker, Select],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent implements OnInit {
  @Output() sidebarStateChanged = new EventEmitter<boolean>();
  reportOptions: ReportData[] =[];
  isValid:boolean | undefined ;
  isValid2:boolean | undefined ;
  isValid3:boolean | undefined ;
  isValid4:boolean | undefined ;
  showPSR:boolean=false;
  showMPR:boolean=false;
  showRR:boolean=false;
  showEER:boolean=false;
  showPPR:boolean=false;
  showPTR:boolean=false;
  showPR:boolean=false;
  chart:boolean | undefined;
  emitchart:boolean=true;
  pom:boolean=false;
  showChart:boolean=false;
  lines: any[] = [];
  selectedProductionLine: ProductionLine | null=null;
  datetime24h1: Date=new Date;
  datetime24h2: Date =new Date;
  time:Date[] | undefined;
  timeDropDown: TimeOption[] | undefined;
  selectedTime: any | undefined;
  isSelected:boolean=false;
  visible: boolean = false;
  value!: number;
  selectedReports:ReportData[]=[];
  selReport:string='';
  showPopupReport:boolean=false;
  stations:any[]=[];
  show:boolean=false;
  stationId:number=0;
  selectedReportValues: number[] =[];
  reports=signal<ReportData[]>([]);
  showScrap:boolean=false;
  datetime24h:Date=new Date;
  showData:boolean=false;
  datetime24:Date=new Date;
  show2:boolean=false;
  sidebarOpen: boolean = false;
  groupedLines: any[] = [];
  constructor(private service:SideService,private cdr: ChangeDetectorRef){}
  ngOnInit() {
    localStorage.removeItem('reportOptions');
    moment.locale('en-gb'); 
    this.showChart = false;
    this.groupedLines = [];
    
    this.service.getProductionLines().subscribe({
      next: (data: ProductionLine[]) => {
        const grouped: any = {
          'ASSY': [],
          'CS': [],
          'CT': []
        };
        
        data.forEach(line => {
          if (line.endDate == null) {
            let groupKey = '';
            
            if (line.description?.startsWith('ASSY')) {
              groupKey = 'ASSY';
            } else if (line.description?.startsWith('CS')) {
              groupKey = 'CS';
            } else if (line.project?.startsWith('CT') || line.project?.startsWith('Cutt')) {
              groupKey = 'CT';
            }
            
            if (groupKey && grouped[groupKey]) {
              // Svaka linija je objekat sa 'name' (za prikaz)
              grouped[groupKey].push({
                name: line.project,
                productionLine: line  
              });
            }
          }
        });
        
        this.groupedLines = Object.keys(grouped)
          .filter(key => grouped[key].length > 0)
          .map(groupName => ({
            name: groupName,  // CS, ASSY, CT
            children: grouped[groupName].sort((a: any, b: any) => 
              a.name.localeCompare(b.name)
            )
          }));
        
        this.cdr.detectChanges();
        this.show = false;
      },
      error: (err) => console.error('Error:', err),
    });
    this.service.getTimeData().subscribe({
          next: (data: any) => {
            this.timeDropDown = data.timeDropDown;
            this.getData();
            this.cdr.detectChanges();
          },
          error: (err) => console.error('Error fetching data:', err),
        });
        if (!this.timeDropDown) {
          this.timeDropDown = [
            { title: 'This Shift' },
          ];
        }
        //selektuje se ppri ucitavanju This Shift
        this.selectedTime = this.timeDropDown?.find(line => line.title === 'This Shift');
        moment.locale('en-gb');
        this.setTime(this.selectedTime);
    
  }
  getFlattenedLines(group: any): any[] {
    let lines:any = [];
    
    if (group.subcategories) {
      group.subcategories.forEach((sub:any) => {
        if (sub.productionLines) {
          lines = [...lines, ...sub.productionLines];
        }
      });
    } else if (group.productionLines) {
      lines = group.productionLines;
    }
    
    return lines;
  }
  getData(){

  }
  onProductionLineChange(event: any) {
  if (event.value && event.value.productionLine) {
  this.selectedProductionLine = event.value.productionLine;
    
    this.service.getReports().subscribe({
      next: (data: any) => {
        this.reportOptions = data.reportOptions;

        if(this.reportOptions){
          this.reportOptions.forEach((line:any)=>{
            if(this.selectedProductionLine?.project=='Imm' || this.selectedProductionLine?.project=='IMM'){
              this.reportOptions=[{ "name": "IMM Report", "value":12, selectedValue:false}]
            }
            else if(this.selectedProductionLine?.project=='Cutting PVC'){
              this.reportOptions=[{ "name": "Cutting PVC Report", "value":13, selectedValue:false}]
            }
            else if(this.selectedProductionLine?.project=='Cutting RL'){
              this.reportOptions=[{ "name": "Cutting RL Report", "value":14, selectedValue:false}]
            }
            else{
              this.reportOptions = this.reportOptions.filter((report: any) => {
                const reportName = report.name;
                return !reportName.includes('IMM Report') &&
                      !reportName.includes('Cutting PVC Report') &&
                      !reportName.includes('Cutting RL Report');
              });
              const hasReworkStation = this.stations.some((station: any) => 
                station.stationName.toLowerCase() === 'rework station'
              )
              if (hasReworkStation) {
                this.reportOptions = this.reportOptions.filter((report: any) => 
                  !report.name.includes('Rework Report')
                );
                this.cdr.detectChanges();
              }
            }
          });

          // LocalStorage logika
          const savedReportsJSON = localStorage.getItem('reportOptions');
          if(savedReportsJSON){
            const savedReports: ReportData[] = JSON.parse(savedReportsJSON);
            this.reportOptions = this.reportOptions.map(ro => {
              const saved = savedReports.find(sr => sr.value === ro.value);
              if(saved && saved.selectedValue === true){
                return {...ro, selectedValue: true};
              }
              return {...ro, selectedValue: false};
            });
          } else {
            this.reportOptions = this.reportOptions.map(ro => ({...ro, selectedValue: false}));
          }

          this.selectedReports = this.reportOptions.filter(ro => ro.selectedValue);
        }

        this.cdr.detectChanges();
        this.showPopupReport = true;
      },
      error: (err) => console.error('Error fetching data:', err),
    });
  }
}

  //funkcija koja setuje dva polja za datume za izabrano vreme u dropdownu
  setTime(selectedTime:any){
    let start:moment.Moment;
    let end:moment.Moment;

    const now=moment();

    if(selectedTime.title=='This Shift'){

      if(now.isBefore(moment().set({hour: 6, minute: 0, second: 0, millisecond: 0}))){
        start=moment().set({hour: 22, minute: 0, second: 0, millisecond: 0});
        end = moment(start).add(8, 'hours');
        this.datetime24h1 = start.toDate();  
        this.datetime24h2 = end.toDate();
        this.isSelected = false;
      }
      else if (now.isBetween(moment().set({ hour: 14, minute: 0, second: 0, millisecond: 0 }), moment().set({ hour: 22, minute: 0, second: 0, millisecond: 0 }))) {
        start = moment().set({ hour: 14, minute: 0, second: 0, millisecond: 0 });
        end = moment(start).add(8, 'hours'); 
        this.datetime24h1 = start.toDate();  
        this.datetime24h2 = end.toDate();
        this.isSelected = false;
      } 
      else{
        start = moment().set({ hour: 6, minute: 0, second: 0, millisecond: 0 });
        end = moment(start).add(8, 'hours'); 
        this.datetime24h1 = start.toDate();  
        this.datetime24h2 = end.toDate();
        this.isSelected = false;
      }
    }
    else if(selectedTime.title=='This Week'){
      start = moment().startOf('isoWeek').set({ hour: 0, minute: 0, second: 0, millisecond: 0 });

      end = moment().endOf('isoWeek').set({ hour: 23, minute: 59, second: 59, millisecond: 999 });

      this.datetime24h1 = start.toDate();  
      this.datetime24h2 = end.toDate();
      this.isSelected = false;
      
    }
    else if(selectedTime.title=='This Hour'){
      let start = moment().startOf('hour');
      let end = moment(start).add(1, 'hour');

      this.datetime24h1 = start.toDate();
      this.datetime24h2 = end.toDate();
      this.isSelected = false;
    }
    else if(selectedTime.title=='Last Hour'){
      let start = moment().subtract(1, 'hour').startOf('hour'); 
      let end = moment(start).add(1, 'hour'); 

      this.datetime24h1 = start.toDate();
      this.datetime24h2 = end.toDate();
      this.isSelected = false;
    }
    else if(selectedTime.title=='Last Shift'){
      if (now.isBetween(moment().set({ hour: 6, minute: 0, second: 0, millisecond: 0 }), moment().set({ hour: 14, minute: 0, second: 0, millisecond: 0 }))) {
        start = moment().set({ hour: 22, minute: 0, second: 0, millisecond: 0 }).subtract(1, 'days'); 
        end = moment(start).add(8, 'hours');
        this.datetime24h1 = start.toDate();
        this.datetime24h2 = end.toDate();
        this.isSelected = false;
      } 
      else if (now.isBetween(moment().set({ hour: 14, minute: 0, second: 0, millisecond: 0 }), moment().set({ hour: 22, minute: 0, second: 0, millisecond: 0 }))) {
        start = moment().set({ hour: 6, minute: 0, second: 0, millisecond: 0 }); 
        end = moment(start).add(8, 'hours');
        this.datetime24h1 = start.toDate();
        this.datetime24h2 = end.toDate();
        this.isSelected = false;
      } 
      else if (now.isBetween(moment().set({ hour: 22, minute: 0, second: 0, millisecond: 0 }), moment().set({ hour: 6, minute: 0, second: 0, millisecond: 0 }).add(1, 'days'))) {
        start = moment().set({ hour: 14, minute: 0, second: 0, millisecond: 0 });
        end = moment(start).add(8, 'hours');
        this.datetime24h1 = start.toDate();
        this.datetime24h2 = end.toDate();
        this.isSelected = false;
      }
    }
    else if(selectedTime.title=='This Production Day'){
      let start = moment().set({ hour: 6, minute: 0, second: 0, millisecond: 0 }); 
      let end = moment(start).add(1, 'days');  

      this.datetime24h1 = start.toDate();
      this.datetime24h2 = end.toDate();
      this.isSelected = false;
    }
    else if(selectedTime.title=='Today'){
      let start = moment().startOf('day'); 
      let end = moment().endOf('day');

      this.datetime24h1 = start.toDate();
      this.datetime24h2 = end.toDate();
      this.isSelected = false;
    }
    else if(selectedTime.title=='Last Production Day'){
      let start = moment().subtract(1, 'days').set({ hour: 6, minute: 0, second: 0, millisecond: 0 }); 
      let end = moment(start).add(1, 'days'); 

      this.datetime24h1 = start.toDate();
      this.datetime24h2 = end.toDate();
      this.isSelected = false;
    }
    else if(selectedTime.title=='Yesterday'){
      let start = moment().subtract(1, 'days').startOf('day'); 
      let end = moment(start).endOf('day'); 

      this.datetime24h1 = start.toDate();
      this.datetime24h2 = end.toDate();
      this.isSelected = false;
    }
    else if(selectedTime.title=='Last 24 Hours'){
      let start = moment().subtract(24, 'hours');  
      let end = moment();  
    
      this.datetime24h1 = start.toDate();
      this.datetime24h2 = end.toDate();
      this.isSelected = false;
    }
   else if(selectedTime.title=='This Production Week'){
      let start = moment().startOf('isoWeek').set({ hour: 6, minute: 0, second: 0, millisecond: 0 });
      let end = moment(start).add(1, 'week');

      this.datetime24h1 = start.toDate();
      this.datetime24h2 = end.toDate();
      this.isSelected = false;
    }
    else if(selectedTime.title=='Last Production Week'){
      let start = moment().subtract(1, 'week').startOf('isoWeek').set({ hour: 6, minute: 0, second: 0, millisecond: 0 });
      let end = moment(start).add(1, 'week');

      this.datetime24h1 = start.toDate();
      this.datetime24h2 = end.toDate();
      this.isSelected = false;
    }
    else if(selectedTime.title=='Last Week'){
      let start = moment().subtract(1, 'week').startOf('isoWeek').set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
      let end = moment(start).endOf('isoWeek').set({ hour: 23, minute: 59, second: 59, millisecond: 999 });

      this.datetime24h1 = start.toDate();
      this.datetime24h2 = end.toDate();
      this.isSelected = false;
    }
    else if(selectedTime.title=='Last 7 Production Days'){
      let start = moment().subtract(7, 'days').set({ hour: 6, minute: 0, second: 0, millisecond: 0 }); 
      let end = moment(start).add(7, 'days'); 

      this.datetime24h1 = start.toDate();
      this.datetime24h2 = end.toDate();
      this.isSelected = false;
    }
    else if(selectedTime.title=='Last 7 Days'){
      let start = moment().subtract(7, 'days').startOf('day'); 
      let end = moment().endOf('day'); 

      this.datetime24h1 = start.toDate();
      this.datetime24h2 = end.toDate();
      this.isSelected = false;
    }
    else if(selectedTime.title=='This Production Month'){
      let start = moment().startOf('month').set({ hour: 6, minute: 0, second: 0, millisecond: 0 });  
      let end = moment(start).add(1, 'month'); 

      this.datetime24h1 = start.toDate();
      this.datetime24h2 = end.toDate();
      this.isSelected = false;
    }
    else if(selectedTime.title=='This Month'){
      let start = moment().startOf('month'); 
      let end = moment(start).endOf('month'); 

      this.datetime24h1 = start.toDate();
      this.datetime24h2 = end.toDate();
      this.isSelected = false;
    }
    else if(selectedTime.title=='Last Production Month'){
      let start = moment().subtract(1, 'month').startOf('month').set({ hour: 6, minute: 0, second: 0, millisecond: 0 }); 
      let end = moment(start).add(1, 'month'); 

      this.datetime24h1 = start.toDate();
      this.datetime24h2 = end.toDate();
      this.isSelected = false;
    }
    else if(selectedTime.title=='Last Month'){
      let start = moment().subtract(1, 'month').startOf('month');  
      let end = moment(start).endOf('month');  

      this.datetime24h1 = start.toDate();
      this.datetime24h2 = end.toDate();
      this.isSelected = false;
    }
    else if(selectedTime.title=='Last 30 Production Days'){
      let start = moment().subtract(30, 'days').set({ hour: 6, minute: 0, second: 0, millisecond: 0 }); 
      let end = moment(start).add(30, 'days'); 

      this.datetime24h1 = start.toDate();
      this.datetime24h2 = end.toDate();
      this.isSelected = false;
    }
    else if(selectedTime.title=='Last 30 Days'){
      let start = moment().subtract(30, 'days').startOf('day'); 
      let end = moment().endOf('day'); 

      this.datetime24h1 = start.toDate();
      this.datetime24h2 = end.toDate();
      this.isSelected = false;
    }
    else if(selectedTime.title=='This Production Quarter'){
      let start = moment().startOf('quarter').set({ hour: 6, minute: 0, second: 0, millisecond: 0 });  
      let end = moment(start).add(1, 'quarter');  

      this.datetime24h1 = start.toDate();
      this.datetime24h2 = end.toDate();
      this.isSelected = false;
    }
    else if(selectedTime.title=='This Quarter'){
      let start = moment().startOf('quarter');  
      let end = moment(start).endOf('quarter'); 

      this.datetime24h1 = start.toDate();
      this.datetime24h2 = end.toDate();
      this.isSelected = false;
    }
    else if(selectedTime.title=='Last Production Quarter'){
      let start = moment().subtract(1, 'quarter').startOf('quarter').set({ hour: 6, minute: 0, second: 0, millisecond: 0 });  
      let end = moment(start).add(1, 'quarter');  

      this.datetime24h1 = start.toDate();
      this.datetime24h2 = end.toDate();
      this.isSelected = false;
    }
    else if(selectedTime.title=='Last Quarter'){
      let start = moment().subtract(1, 'quarter').startOf('quarter'); 
      let end = moment(start).endOf('quarter'); 

      this.datetime24h1 = start.toDate();
      this.datetime24h2 = end.toDate();
      this.isSelected = false;
    }
    else if(selectedTime.title=='Last 3 Production Months'){
      let start = moment().subtract(3, 'months').set({ hour: 6, minute: 0, second: 0, millisecond: 0 });  
      let end = moment(start).add(3, 'months');  
    
      this.datetime24h1 = start.toDate();
      this.datetime24h2 = end.toDate();
      this.isSelected = false;
    }
    else if(selectedTime.title=='Last 3 Months'){
      let start = moment().subtract(3, 'months').startOf('month');  
      let end = moment().endOf('month');  

      this.datetime24h1 = start.toDate();
      this.datetime24h2 = end.toDate();
      this.isSelected = false;
    }
    else if(selectedTime.title=='This Production Year'){
      let start = moment().startOf('year').set({ hour: 6, minute: 0, second: 0, millisecond: 0 });  
      let end = moment(start).add(1, 'year');  

      this.datetime24h1 = start.toDate();
      this.datetime24h2 = end.toDate();
      this.isSelected = false;
    }
    else if(selectedTime.title=='This Year'){
      let start = moment().startOf('year');  
      let end = moment(start).endOf('year');  
    
      this.datetime24h1 = start.toDate();
      this.datetime24h2 = end.toDate();
      this.isSelected = false;
    }
    else if(selectedTime.title=='Custom'){
      this.isSelected = true;
    }
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
    this.sidebarStateChanged.emit(this.sidebarOpen);
  }
  toggleChart(): void {
    this.showChart = !this.showChart;
      
  }
  funkcija() {
    this.visible = false;
    localStorage.setItem('reportOptions', JSON.stringify(this.reportOptions));
  }
  reportChange(report:ReportData){
   
      //console.log(this.service.reports());
      
  }
  showDialog() {
    this.visible = true;
  }
  onTimeChange() {
    //poziva se funkcija koja automatski popuinjava polja za kalendar na osnovu izabranog vremena
    moment.locale('en-gb');
    this.setTime(this.selectedTime);   
  }
}
