import { Component, OnInit, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { WeatherService } from '../../services/weather.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class DashboardComponent implements OnInit {
  currentUser = signal<any>(null);
  weatherData = signal<any>(null);


  constructor(
    private authService: AuthService,
    private weatherService: WeatherService
  ) { }

  ngOnInit(): void {
    // Use the service-provided signal for current user
    this.currentUser = this.authService.currentUserSignal;

    this.weatherService.getWeather().subscribe({
      next: data => this.weatherData.set(data),
      error: err => console.error('Failed to fetch weather', err)
    });
  }

  logout() {
    this.authService.logout();
  }
}
