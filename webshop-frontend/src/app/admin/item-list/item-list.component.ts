import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item.model';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  items: Item[] = [];

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    // this.items = this.itemService.getItems();
    this.itemService.getItemsFromDatabase().subscribe(items => {
      this.items = items;
      console.log(items);
      // for (const key in items) {
      //   this.items.push(items[key]);
      // }
    })
  }

  onDeleteItem(i: number | undefined): void {
    // let num = Number("1");
    // this.itemService.deleteItem(i);
    if (i) {
      this.itemService.deleteItem(i).subscribe(()=>{
        this.itemService.getItemsFromDatabase().subscribe(items => {
          this.items = items;
          console.log(items);
          // for (const key in items) {
          //   this.items.push(items[key]);
          // }
        })
      });
    }
    // this.itemService.saveItemsToDatabase(this.items).subscribe();
  }

}
