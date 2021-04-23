import { Component, OnInit } from '@angular/core';
import { Console } from 'node:console';
import { ForecastService } from '../forecast.service';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.css']
})
export class TodayComponent implements OnInit {
  timeline =[];
  weatherNow:any;
  location:any;

  currentTime =new Date();
  constructor(private forecastservice: ForecastService) { }

  ngOnInit(): void {
    this.forecastservice.getweatherforecast().subscribe(data=>{
     this.getTodayforecast(data)
 
    })
}
dateRange(){
  const start = new Date();
  start.setHours(start.getHours()+(start.getTimezoneOffset() /60));
  const to = new Date(start)
    to.setHours( to.getHours() + 2,to.getMinutes() + 59, to.getSeconds() +59);
 return { start, to }
}
getTodayforecast(today:any){
  this.location = today.city;
  for (const forecast of today.list.slice(0,0)){
this.timeline.push({
 time:forecast.dt_txt,
  temp:forecast.main.temp
  });

const apiDate =new Date(forecast.dt_txt).getTime();

  if(this.dateRange().start.getTime() <=apiDate && this.dateRange().to.getTime() >=apiDate)
  this.weatherNow = forecast;
  console.log(this.weatherNow);
}
  }
}