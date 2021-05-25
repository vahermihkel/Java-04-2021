import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { CarouselService } from '../admin/carousel-settings/carousel.service';
import { CartService } from '../cart/cart.service';
import { Item } from '../models/item.model';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  images!: string[];

  items: Item[] = [];
  // kuupaev = new Date();
  // protsent = 0.5;

  // compiling time - compiled successfully
  constructor(private cartService: CartService, 
      private itemService: ItemService,
      private config: NgbCarouselConfig,
      private carousel: CarouselService) {
  }
  // 19.17

  // cartService2 = new CartService();      VARIANT 2

  // klassimuutuja: CartService;            VARIANT 3
  // constructor(muutuja: CartService) {
  //   this.klassimuutuja = muutuja;
  // }

  // runtime - iga kord kui kasutaja aktiveerib componendi
  ngOnInit(): void {
    // this.config.interval = 100;
    // this.config.wrap = this.carousel.carouselSettings.wrap;
    // this.config.keyboard = this.carousel.carouselSettings.keyboard;
    // this.config.pauseOnHover = this.carousel.carouselSettings.pauseOnHover;
    this.carousel.getSettingsFromFirebase().subscribe(settings => {
      this.images = [123,700, 533, 807, 124].map((n) => `https://picsum.photos/id/${n}/900/500`);
      this.config.interval = settings.interval;
      console.log(this.config.interval);
      this.config.wrap = settings.wrap;
      this.config.keyboard = settings.keyboard;
      this.config.pauseOnHover = settings.pauseOnHover;
      if (this.images.length === 1) {
        this.config.showNavigationArrows = false;
        this.config.showNavigationIndicators = false;
      }
    })

    console.log("HOME componendis");
    // this.items = this.itemService.getItems();
    this.itemService.getItemsFromDatabase().subscribe(items => {
      for (const key in items) {
        this.items.push(items[key]);
      }
      console.log("SIIA JÕUAN HILJEM");
    })
    console.log(this.items.length);
    console.log("EI SAA HAKTA SIIN THIS.ITEMS MUUTUJAT KASUTAMA");

    
  }
  // ngOnInit - hakatakse HTMLi vaatama

  onAddToCart(item: Item): void {
    // this.itemService.saveItemsToDatabase().subscribe();
    // this.items = [];
    // this.items.push(item);
    // CartComponent.cartItems.push(item); - EI SAA!!
    this.cartService.addToCart(item);
    this.cartService.cartItemsChanged.next(this.cartService.getCartItems());
  }

}
