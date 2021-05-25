import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  sumOfCart = 0;

  constructor(private cartService: CartService,
    private translate: TranslateService) { }

  ngOnInit(): void {
    this.cartService.cartItemsChanged.subscribe(items => {
      this.sumOfCart = 0;
      items.forEach(item => {
        this.sumOfCart += item.price
      });
    });

    let lang = localStorage.getItem("language");
    if (lang) {
      this.useLanguage(lang);
    }
    

    // this.cartService.cartItemsChanged.unsubscribe();
  }

  useLanguage(language: string): void {
    this.translate.use(language);
    localStorage.setItem("language", language);
  }

}
