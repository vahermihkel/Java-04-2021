import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart/cart.service';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  items: {imgSrc: string, title: string, price: number, category: string}[] = [];

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
    this.items = this.itemService.getItems();
  }
  // ngOnInit - hakatakse HTMLi vaatama

  onAddToCart(item: {imgSrc: string, title: string, price: number, category: string}) {
    // this.items = [];
    // this.items.push(item);
    // CartComponent.cartItems.push(item); - EI SAA!!
    this.cartService.addToCart(item);
  }

}
