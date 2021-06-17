import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../auth/auth.service';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  sumOfCart = 0;
  isLoggedIn = false;

  constructor(private cartService: CartService,
    private translate: TranslateService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn = sessionStorage.getItem("userData") ? true : false;

    this.cartService.cartItemsChanged.subscribe(items => {
      this.sumOfCart = 0;
      items.forEach(item => {
        this.sumOfCart += item.cartItem.price * item.count;
      });
    });

    this.authService.loggedInChanged.subscribe(isLoggedIn => {
      console.log("asdasdasdsdasda");
      this.isLoggedIn = isLoggedIn;
    })

    let lang = localStorage.getItem("language");
    if (lang) {
      this.useLanguage(lang);
    }
    // this.cartService.cartItemsChanged.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
    this.authService.loggedInChanged.next(false);
  }

  useLanguage(language: string): void {
    this.translate.use(language);
    localStorage.setItem("language", language);
  }

}
