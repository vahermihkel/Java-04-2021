import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarouselSettings } from './carousel-settings.model';

@Injectable({
  providedIn: 'root'
})
export class CarouselService {
  url = "https://java-04-2021-default-rtdb.europe-west1.firebasedatabase.app/carousel-settings.json";

  constructor(private http: HttpClient) { }

  saveSettingsToFirebase(settings: CarouselSettings) {
    return this.http.put(this.url,settings);
  }

  getSettingsFromFirebase() {
    return this.http.get<CarouselSettings>(this.url);
  }
}
