import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortenTitle'
})
export class ShortenTitlePipe implements PipeTransform {

  transform(value: string, wordCount?: number): any {
    // if (wordCount == null) {
    //   wordCount = 3;
    // }
    wordCount = wordCount ?? 3;
    return value.split(" ").slice(0,wordCount).join(" ");
  }

  // 1. Näitab kasutajale teistmoodi ilma algandmeid muutmata
  // 2. Saan taaskasutada koodi

  // ELas metsas mutionu, keset kuuski -- .split(" ")
  // ["Elas", "metsas", "mutionu,", "keset", "kuuski"] -- .slice(0,3)
  // ["Elas", "metsas", "mutionu,"] .join("::")
  // Elas::metsas::mutionu  - string

}
