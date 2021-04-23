import { Component, OnInit } from '@angular/core';
import { pluck } from 'rxjs/operators';
import { ForecastService } from '../forecast.service';


@Component({
  selector: 'app-future',
  templateUrl: './future.component.html',
  styleUrls: ['./future.component.css']
})
export class FutureComponent implements OnInit {
weatherData:any =[];
  constructor (private forecastservice :ForecastService){ }


  ngOnInit(): void {
   this.forecastservice.getWeatherForecast().pipe(
      pluck('list')
   )
      .subscribe(data=>
      this.futureForecast(data)

  })

  FutureForecast(data:any){
    for(let i = 0; i < data.length; i=i + 8){
      this.weatherData.push(data[i]);
  }

  console.log(this.weatherData);
}
