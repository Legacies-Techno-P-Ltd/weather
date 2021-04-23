import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable}  from 'rxjs';
import { map,switchMap }  from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ForecastService {
  http: any;

  constructor() { }

  getweatherforecast(){
    return new Observable((observer)=>{
      navigator.geolocation.getCurrentPosition(

        (position)=>{
          observer.next(position)
        },
        (error)=>{
          observer.next(error)
        }
      )
    }).pipe(
      map((value:any)=>{
return new HttpParams()
        .set('lon',value.coords.longitude)
        .set('lat',value.coords.latitude)
        .set('units','imperial')
        .set('appid', '13647443f1e344a792a81041212104')

      }),
      switchMap((values)=>{
        return this.http.get( 'https://api.weatherapi.com/v1/forecast.json?key=13647443f1e344a792a81041212104&q=London&days=7&aqi=no&alerts=no',{params:values})
      }) 
    )
  }
  }

