import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiUrl = 'https://api.open-meteo.com/v1/forecast?latitude=28.535517&longitude=77.391029&current_weather=true';

  constructor(private http: HttpClient) { }

  getWeather(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
