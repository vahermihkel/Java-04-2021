import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  itemsInCart: {imgSrc: string, title: string, price: number, category: string}[] = [];

  constructor() { }
}
