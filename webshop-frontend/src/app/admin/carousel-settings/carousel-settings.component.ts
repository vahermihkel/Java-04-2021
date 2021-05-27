import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { CarouselSettings } from './models/carousel-settings.model';
import { CarouselService } from './carousel.service';
import { CarouselImage } from './models/carousel-image.model';

@Component({
  selector: 'app-carousel-settings',
  templateUrl: './carousel-settings.component.html',
  styleUrls: ['./carousel-settings.component.css']
})
export class CarouselSettingsComponent implements OnInit {
  carouselSettingsForm!: FormGroup;
  images: CarouselImage[] = [];

  constructor(private carousel: CarouselService) { }

  ngOnInit(): void {
    this.carousel.getImagesFromFirebase().subscribe(images=>{
      for (const key in images) {
        this.images.push(images[key]);
      }
    })
    // this.images = this.carousel.images;
    // REFRESHIGA EI TULE
    this.carousel.getSettingsFromFirebase().subscribe(settings => {
      this.carouselSettingsForm = new FormGroup({
        interval: new FormControl(settings ? settings.interval: ""),
        wrap: new FormControl(settings ? settings.wrap: ""),
        keyboard: new FormControl(settings ? settings.keyboard: ""),
        pauseOnHover: new FormControl(settings ? settings.pauseOnHover: ""),
      })
    })
  }

  onSettingsSubmit() {
    let carouselSettings = new CarouselSettings(
      this.carouselSettingsForm.value.interval,
      this.carouselSettingsForm.value.wrap,
      this.carouselSettingsForm.value.keyboard,
      this.carouselSettingsForm.value.pauseOnHover,
      true,
      true
    );
    this.carousel.saveSettingsToFirebase(carouselSettings).subscribe(()=>{
      alert("Uuendused salvestatud!");
    });
  }

  onDeleteImage(i: number) {
    this.images.splice(i,1);
    this.carousel.saveImagesToFirebase(this.images).subscribe();
  }

  onImageSubmit(imageAddForm: NgForm) {
    // this.carousel.images.push(imageAddForm.value);
    this.carousel.addImageToFirebase(imageAddForm.value).subscribe();
    imageAddForm.reset();
  }
}
