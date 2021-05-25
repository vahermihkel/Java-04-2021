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
      for (const key in items) {
        this.items.push(items[key]);
      }
    })
  }

  onDeleteItem(i: number): void {
    // let num = Number("1");
    // this.itemService.deleteItem(i);
    this.items.splice(i,1);
    this.itemService.saveItemsToDatabase(this.items).subscribe();
  }

}
