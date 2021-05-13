import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-item-add',
  templateUrl: './item-add.component.html',
  styleUrls: ['./item-add.component.css']
})
export class ItemAddComponent implements OnInit {

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    console.log(form);
    console.log(form.value);
    console.log(form.value.title);
    console.log(form.value.price);
    if (form.valid) {
      this.itemService.addItem(form.value);
      form.reset();
      // TEEME UUE ITEM.SERVICE-i
      // TÕSTAME HOME.COMPONENT SEEST KÕIK ITEMS ITEM.SERVICE'I SISSE
      // TEEME HOME.COMPONENT SEEST ÜHENDUSE SERVICE-GA
      // HOME.COMPONENT NGONINIT SEEST VÕTAME KÕIK SERVICE-I SEEST
      
      // CART.COMPONENT'S TEEME ÜHENDUSE ITEM.SERVICE-GA (DEPENDENCY INJECTION)
      // PUSHIN ITEM.SERVICE-I SEES OLEVATELE ESEMETELE ÜHE ESEME JUURDE VORMISISESTUSES
    }
  }
}
