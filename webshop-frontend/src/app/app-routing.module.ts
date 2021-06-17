import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { CarouselSettingsComponent } from './admin/carousel-settings/carousel-settings.component';
import { ItemAddComponent } from './admin/item-add/item-add.component';
import { ItemEditComponent } from './admin/item-edit/item-edit.component';
import { ItemListComponent } from './admin/item-list/item-list.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { ViewComponent } from './home/view/view.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "ostukorv", component: CartComponent },
  { path: "toode/:itemId", component: ViewComponent },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },

  { path: "admin", canActivateChild: [AuthGuard], children: [
    { path: "", component: AdminHomeComponent },
    { path: "galerii-seaded", component: CarouselSettingsComponent },
    { path: "lisa-ese", component: ItemAddComponent },
    { path: "muuda-eset/:itemId", component: ItemEditComponent },
    { path: "esemete-list", component: ItemListComponent },
  ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
