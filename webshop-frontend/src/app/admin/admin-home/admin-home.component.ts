import { Component, OnInit } from '@angular/core';
// import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  constructor(
    // private itemService: ItemService
    ) { }

  ngOnInit(): void {
  }

  // onSaveItemsToDatabase() {
  //   this.itemService.saveItemsToDatabase().subscribe(()=>{
  //     alert("PANDUD!");
  //   });
  // }
}
