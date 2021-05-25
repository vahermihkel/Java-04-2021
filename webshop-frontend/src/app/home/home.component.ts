import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart/cart.service';
import { Item } from '../models/item.model';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  items: Item[] = [];
  // kuupaev = new Date();
  // protsent = 0.5;

  // compiling time - compiled successfully
  constructor(private cartService: CartService, 
      private itemService: ItemService) { }

  // cartService2 = new CartService();      VARIANT 2

  // klassimuutuja: CartService;            VARIANT 3
  // constructor(muutuja: CartService) {
  //   this.klassimuutuja = muutuja;
  // }

  // runtime - iga kord kui kasutaja aktiveerib componendi
  ngOnInit(): void {
    console.log("HOME componendis");
    // this.items = this.itemService.getItems();
    this.itemService.getItemsFromDatabase().subscribe(items => {
      for (const key in items) {
        this.items.push(items[key]);
      }
      console.log("SIIA JÕUAN HILJEM")
    })
    console.log(this.items.length);
    console.log("EI SAA HAKTA SIIN THIS.ITEMS MUUTUJAT KASUTAMA")
  }
  // ngOnInit - hakatakse HTMLi vaatama

  onAddToCart(item: Item): void {
    // this.items = [];
    // this.items.push(item);
    // CartComponent.cartItems.push(item); - EI SAA!!
    this.cartService.addToCart(item);
    this.cartService.cartItemsChanged.next(this.cartService.getCartItems());
  }

}
