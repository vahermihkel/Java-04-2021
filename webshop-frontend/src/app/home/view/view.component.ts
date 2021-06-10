import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from 'src/app/models/item.model';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  item!: Item;
  // hüüumärgi abil saan panna tühjuse muutuja väärtuseks

  constructor(private itemService: ItemService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    let id = Number(this.route.snapshot.paramMap.get("itemId"));
    this.itemService.getItem(id).subscribe(item => {
      this.item = item;
    });
  }

}
