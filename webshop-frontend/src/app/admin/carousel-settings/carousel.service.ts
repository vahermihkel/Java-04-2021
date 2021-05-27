import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarouselImage } from './models/carousel-image.model';
import { CarouselSettings } from './models/carousel-settings.model';

@Injectable({
  providedIn: 'root'
})
export class CarouselService {
  // images: CarouselImage[] = [];

  url = "https://java-04-2021-default-rtdb.europe-west1.firebasedatabase.app/";

  constructor(private http: HttpClient) { }

  saveSettingsToFirebase(settings: CarouselSettings) {
    return this.http.put(this.url + "carousel-settings.json",settings);
  }

  getSettingsFromFirebase() {
    return this.http.get<CarouselSettings>(this.url + "carousel-settings.json");
  }

  saveImagesToFirebase(images: CarouselImage[]) {
    return this.http.put(this.url + "carousel-images.json",images);
  }

  addImageToFirebase(image: CarouselImage) {
    return this.http.post(this.url + "carousel-images.json",image);
  }

  getImagesFromFirebase() {
    return this.http.get<CarouselImage[]>(this.url + "carousel-images.json");
  }
}
