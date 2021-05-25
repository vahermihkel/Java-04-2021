import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CarouselSettings } from './carousel-settings.model';
import { CarouselService } from './carousel.service';

@Component({
  selector: 'app-carousel-settings',
  templateUrl: './carousel-settings.component.html',
  styleUrls: ['./carousel-settings.component.css']
})
export class CarouselSettingsComponent implements OnInit {
  carouselSettingsForm!: FormGroup;

  constructor(private carousel: CarouselService) { }

  ngOnInit(): void {
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

  onSubmit() {
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
}
