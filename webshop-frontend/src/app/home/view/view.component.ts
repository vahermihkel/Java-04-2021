import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  item!: {imgSrc: string, title: string, price: number, category: string};
  // hüüumärgi abil saan panna tühjuse muutuja väärtuseks

  constructor(private itemService: ItemService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    let id = Number(this.route.snapshot.paramMap.get("itemId"));
    this.item = this.itemService.getItems()[id];
  }

}
