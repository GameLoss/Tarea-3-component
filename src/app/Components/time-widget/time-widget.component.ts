import { getLocaleFirstDayOfWeek, Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { stringify } from 'querystring';

interface IDataResponse{
  day: string;
  date: number;
  month: string;
  year: number;
  hour: number;
  minute: number;
  second: number;
  timeZone: string;
}

interface IApiResponse{
  ianaTimeId:             string;
  displayName:            string;
  effectiveTimeZoneFull:  string;
  effectiveTimeZoneShort: string;
  utcOffsetSeconds:       number;
  utcOffset:              string;
  isDaylightSavingTime:   boolean;
  localTime:              string;
}

@Component({
  selector: 'app-time-widget',
  templateUrl: './time-widget.component.html',
  styleUrls: ['./time-widget.component.scss'],
})
export class TimeWidgetComponent implements OnInit {

  TimeData: IDataResponse;
  firstSec: boolean=false;
  constructor() { }

  ngOnInit() {
    this.TimeData=<IDataResponse>{};
    this.getTimeData("America/Mexico_City");
    this.countSeconds();
  }

  

  getTimeData(value: string){
    
    value = value.replace(/\//gi, "%2F");
    fetch(`https://api.bigdatacloud.net/data/timezone-info?timeZoneId=${value}&utcReference=0&key=cb435ebd3bd7445885588784710c5cf4`)
    .then(response=>response.json())
    .then((data:IApiResponse)=>{
      
      var dtDate=new Date(data.localTime);

      this.TimeData.day=this.getDayName(dtDate.getDay());
      this.TimeData.date=dtDate.getDate();
      this.TimeData.month=this.getMonthName(dtDate.getMonth()+1);
      this.TimeData.hour=dtDate.getHours();
      this.TimeData.minute=dtDate.getMinutes();
      if(!this.firstSec){
        this.TimeData.second=dtDate.getSeconds();
        this.firstSec=true;
      }
      
      this.TimeData.timeZone=data.effectiveTimeZoneShort;

    });

  }

  getDayName(day:number){
    var dayName: string;
    switch(day){
      case 1:
        dayName='Lunes';
        break;
      case 2:
        dayName='Martes';
        break;
      case 3:
        dayName='Miércoles';
        break;
      case 4:
        dayName='Jueves';
        break;
      case 5:
        dayName='Viernes';
        break;
      case 6:
        dayName='Sábado';
        break;
      case 7:
        dayName='Domingo';
        break;
    }
    return dayName;
  }

  getMonthName(month: number){
    var monthName: string;
    switch(month){
      case 1:
        monthName='Enero';
        break;
      case 2:
        monthName='Febrero';
        break;
      case 3:
        monthName='Marzo';
        break;
      case 4:
        monthName='Abril';
        break;
      case 5:
        monthName='Mayo';
        break;
      case 6:
        monthName='Junio';
        break;
      case 7:
        monthName='Julio';
        break;
      case 8:
        monthName='Agosto';
        break;
      case 9:
        monthName='Septiembre';
        break;
      case 10:
        monthName='Octubre';
        break;
      case 11:
        monthName='Noviembre';
        break;
      case 12:
        monthName='Diciembre';
        break;
    }
    return monthName;
  }

  countSeconds(){
    setInterval(() => {
      this.TimeData.second++;
      if(this.TimeData.second == 60){
        this.TimeData.minute++;
        if(this.TimeData.minute==60){
          this.TimeData.minute=0;
          this.TimeData.hour++;
          if(this.TimeData.hour==24){
            this.TimeData.hour=0;
          }
        }
        this.TimeData.second=0;
      } 
    }, 1000)
  }

}
