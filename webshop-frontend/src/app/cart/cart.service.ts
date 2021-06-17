import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  //{cartItem: {title:string,price:number....}, count: number}[]
  private itemsInCart: {cartItem: Item, count: number}[] = [];
  cartItemsChanged = new Subject<{cartItem: Item, count: number}[]>();

  constructor() { }

  addToCart(item: Item): void {
    let index = this.itemsInCart.findIndex(e => e.cartItem.id === item.id);
    if (index != -1) {
      this.itemsInCart[index].count++;
    } else {
      this.itemsInCart.push({cartItem: item, count: 1});
    }
  }

  removeFromCart(index: number): void {
    this.itemsInCart.splice(index, 1);
  }

  reduceFromCart(item: Item): void {
    let index = this.itemsInCart.findIndex(e => e.cartItem.id === item.id);
    if (this.itemsInCart[index].count > 1) {
      this.itemsInCart[index].count--;
    } else {
      this.itemsInCart.splice(index, 1);
    }
  }

  emptyCart(): void {
    this.itemsInCart = [];
  }

  getCartItems(): {cartItem: Item, count: number}[] {
    return this.itemsInCart.slice();
  }
}
