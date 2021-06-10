import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { CarouselService } from '../admin/carousel-settings/carousel.service';
import { CarouselImage } from '../admin/carousel-settings/models/carousel-image.model';
import { CartService } from '../cart/cart.service';
import { Item } from '../models/item.model';
import { ItemService } from '../services/item.service';
import { Direction } from './direction.enum';
import { Property } from './property.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  images: CarouselImage[] = [];
  items: Item[] = [];
  sortState = {direction: Direction.ORIGINAL, property: Property.EMPTY };


  constructor(private cartService: CartService, 
      private itemService: ItemService,
      private config: NgbCarouselConfig,
      private carousel: CarouselService) {
  }

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
      this.carousel.getImagesFromFirebase().subscribe(images=>{
        for (const key in images) {
          this.images.push(images[key]);
        }
        if (this.images.length === 1) {
          this.config.showNavigationArrows = false;
          this.config.showNavigationIndicators = false;
        }
        this.config.interval = settings.interval;
        console.log(this.config.interval);
        this.config.wrap = settings.wrap;
        this.config.keyboard = settings.keyboard;
        this.config.pauseOnHover = settings.pauseOnHover;
      })
    })

    console.log("HOME componendis");
    // this.items = this.itemService.getItems();
    this.itemService.getItemsFromDatabase().subscribe(items => {
      this.items = items;
      console.log("SIIA JÕUAN HILJEM");
    })
    console.log(this.items.length);
    console.log("EI SAA HAKTA SIIN THIS.ITEMS MUUTUJAT KASUTAMA");

    
  }
  // ngOnInit - hakatakse HTMLi vaatama

  onSortByTitle() {
    this.itemService.getItemsFromDatabase().subscribe(items => {
      this.items = items;
      switch (this.sortState.direction) {
        case Direction.ORIGINAL: 
          this.items.sort((previousItem,currentItem)=>
            previousItem.title.localeCompare(currentItem.title)
          )
          this.sortState.direction = Direction.ASC;
          this.sortState.property = Property.TITLE;
        break;
        case Direction.ASC: 
          this.items.sort((previousItem,currentItem)=>
            currentItem.title.localeCompare(previousItem.title)
          )
          this.sortState.direction = Direction.DESC;
          this.sortState.property = Property.TITLE;
        break;
        case Direction.DESC: 
          this.sortState.direction = Direction.ORIGINAL;
          this.sortState.property = Property.EMPTY;
        break;
      }
    })
      
  }

  onSortByPrice() {
    this.itemService.getItemsFromDatabase().subscribe(items => {
      this.items = items;
      switch (this.sortState.direction) {
        case Direction.ORIGINAL: 
          this.items.sort((previousItem,currentItem)=>
            previousItem.price - currentItem.price
          )
          this.sortState.direction = Direction.ASC;
          this.sortState.property = Property.PRICE;
        break;
        case Direction.ASC: 
          this.items.sort((previousItem,currentItem)=>
            currentItem.price - previousItem.price
          )
          this.sortState.direction = Direction.DESC;
          this.sortState.property = Property.PRICE;
        break;
        case Direction.DESC: 
          this.sortState.direction = Direction.ORIGINAL;
          this.sortState.property = Property.EMPTY;
        break;
      }
    })
  }

  onAddToCart(item: Item): void {
    // this.itemService.saveItemsToDatabase().subscribe();
    // this.items = [];
    // this.items.push(item);
    // CartComponent.cartItems.push(item); - EI SAA!!
    this.cartService.addToCart(item);
    this.cartService.cartItemsChanged.next(this.cartService.getCartItems());
  }

}
