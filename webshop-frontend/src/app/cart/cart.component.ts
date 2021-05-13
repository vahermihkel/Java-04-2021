import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: {imgSrc: string, title: string, price: number, category: string}[] = [];
  sumOfCart = 0; // primitiivil pole üldiselt tüüpi vaja

  // DEPENDENCY INJECTION
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    console.log("CART componendis");
    this.cartItems = this.cartService.getCartItems();
    
    /*[{title: .., price: 20},{title: .., price: 30}]
      cartItem =>  {title: .., price: 20}  
      20    = 0 + 20
      cartItem =>  {title: .., price: 30} 
      50    = 20 + 30
    */
    this.calculateSumOfCart();
  }

  onRemoveFromCart(index: number) {
    this.cartService.removeFromCart(index);
    this.calculateSumOfCart();
  }

  onEmptyCart() {
    // manipulatsioonidega sama mälukoht
    // this.cartService.itemsInCart.splice(0);
    // võrdusmärgiga ehk uue väärtuse andmisega uus mälukoht
    this.cartService.emptyCart();
    this.cartItems = this.cartService.getCartItems();
    this.calculateSumOfCart();
  }

  calculateSumOfCart() {
    this.sumOfCart = 0;
    this.cartItems.forEach(cartItem => {
      this.sumOfCart += cartItem.price;
    });
  }

}
