import { Pipe, PipeTransform } from '@angular/core';
import { Item } from '../models/item.model';

@Pipe({
  name: 'uniqueCategory'
})
export class UniqueCategoryPipe implements PipeTransform {

  transform(value: Item[]): string[] {
    return value.map(item => item.category).filter((category, index, categories)=>{
      return categories.indexOf(category) == index;
    });
  }

  // [
    //   {title: "sad", category: "rock"}, 
    //   {title: "asd", category: "pop"}, 
    //   {title: "sad", category: "rock"}, 
    //   {title: "asd", category: "ballad"},
    //   {title: "qwe", category: "ballad"}
    // ]

    // .map(OBJEKTI => asendan sellega)
    // .map(o => o.title)   : ["sad","asd","sad","asd","qwe"]
    // .filter() -- jätab alles vastavalt sellele kas .filter(o => true/false)
    // titles.indexOf("sad") ---- 0    index: 0     UNIKAALNE
    // titles.indexOf("asd") ---- 1    index: 1     UNIKAALNE
    // titles.indexOf("sad") ---- 0    index: 2   
    // titles.indexOf("asd") ---- 1    index: 3
    // titles.indexOf("qwe") ---- 4    index: 4     UNIKAALNE
}
