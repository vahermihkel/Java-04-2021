import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private itemsInCart: Item[] = [];
  cartItemsChanged = new Subject<Item[]>();

  constructor() { }

  addToCart(item: Item): void {
    this.itemsInCart.push(item);
  }

  removeFromCart(index: number): void {
    this.itemsInCart.splice(index, 1);
  }

  emptyCart(): void {
    this.itemsInCart = [];
  }

  getCartItems(): Item[] {
    return this.itemsInCart.slice();
  }
}
