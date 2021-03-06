import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private items: Item[] = [];
  // private items: Item[] = [{"imgSrc":"https://i.ebayimg.com/thumbs/images/g/wEwAAOSwHHFgagsQ/s-l225.webp","title":"New ListingRodgers And Hammerstein's Oklahoma LP Record Vinyl Stereo Album Words And Music","price":9.95,"category":"vinyls"},{"imgSrc":"https://i.ebayimg.com/thumbs/images/g/X-8AAOSwMpJgfcX2/s-l225.webp","title":"New ListingTHE SELECTER -TOO MUCH PRESSURE - LIMITED EDITION CLEAR VINYL + SINGLE  'NEW* ","price":37.54,"category":"vinyls"},{"imgSrc":"https://i.ebayimg.com/thumbs/images/g/wdoAAOSwPvlgaH1R/s-l225.webp","title":"Lot of 6 Mid 2000's Progressive House Vinyl Records Dance EP Singles ","price":19.99,"category":"vinyls"},{"imgSrc":"https://i.ebayimg.com/thumbs/images/g/Q-EAAOSwzJBgTiJ6/s-l225.webp","title":"New ListingTHE NOLANS - ORIGINAL 1979 VINYL LP 12” VG+ / NEAR MINT 70’s","price":11.11,"category":"vinyls"},{"imgSrc":"https://i.ebayimg.com/thumbs/images/g/K68AAOSwXi1gk8al/s-l225.webp","title":"New Listing80s R&B Rap Hip Hop PUBLIC ENEMY takes a nation 1988 UK Vinyl LP + Inner N Mint","price":11.11,"category":"vinyls"},{"imgSrc":"https://i.ebayimg.com/thumbs/images/g/rk0AAOSwCudfm1Is/s-l225.webp","title":"New ListingRETRO JUKEBOX 45 rpm vinyl HIT records you select CLEANED AND PLAYS VG+ or NM-.","price":5.99,"category":"vinyls"},{"imgSrc":"https://i.ebayimg.com/thumbs/images/g/l80AAOSwVulgfk60/s-l225.webp","title":"Muse-Absolution (UK IMPORT) Vinyl / 12\" Album NEW","price":25.31,"category":"vinyls"},{"imgSrc":"https://i.ebayimg.com/thumbs/images/g/LVEAAOSwF2tflOPZ/s-l225.webp","title":"THE SMITHS - Rank (180 Gram 2LP Vinyl) 2016 Rhino R1-46642 NEW / SEALED","price":34.99,"category":"vinyls"},{"imgSrc":"https://i.ebayimg.com/thumbs/images/g/AG4AAOSwsQ1gk0nj/s-l225.webp","title":"New ListingNirvana-Nirvana Vinyl / 12\" Album NEW","price":29.9,"category":"vinyls"},{"imgSrc":"https://i.ebayimg.com/thumbs/images/g/nZsAAOSwB8ZfCwba/s-l225.webp","title":"New ListingJUKEBOX 45 rpm vinyl records VG+ NM- ALL BEATLES you select CLEANED & PLAYS","price":6.99,"category":"vinyls"},{"imgSrc":"https://i.ebayimg.com/thumbs/images/g/EI4AAOSw59Jf9Qah/s-l225.webp","title":"STRANGE TALK-CAST AWAY VINYL LP NEW","price":24.95,"category":"vinyls"},{"imgSrc":"https://i.ebayimg.com/thumbs/images/g/YhoAAOSwYZJd29Dn/s-l225.webp","title":"Obijan : Holoprogram VINYL 12\" Album (2019) ***NEW*** FREE Shipping, Save £s","price":14.99,"category":"vinyls"},{"imgSrc":"https://i.ebayimg.com/thumbs/images/g/HZcAAOSwDwNfmFdb/s-l225.webp","title":"New ListingJUKEBOX NM- 45 rpm vinyl records pop 70s/80s Rock you select CLEANED & PLAYS.","price":5.99,"category":"vinyls"},{"imgSrc":"https://i.ebayimg.com/thumbs/images/g/8dQAAOSwrAFgRlUs/s-l225.webp","title":"Fleetwood Mac - Rumours (2011)  Vinyl LP  NEW/SEALED  SPEEDYPOST","price":27.75,"category":"vinyls"},{"imgSrc":"https://i.ebayimg.com/thumbs/images/g/6eoAAOSw6D9glBAf/s-l225.webp","title":"New ListingShalamar The Look SEALED Vinyl LP Solar 9 60239 Dead Giveaway 1st Pressing 1983","price":14.99,"category":"vinyls"},{"imgSrc":"https://i.ebayimg.com/thumbs/images/g/LYIAAOSwTp5gk~x4/s-l225.webp","title":"New ListingCyndi Lauper ‎– She's So Unusual: Portrait Vinyl LP 1983 (Pop / Electronic)","price":14,"category":"vinyls"},{"imgSrc":"https://i.ebayimg.com/thumbs/images/g/RtkAAOSwMkFgk6KR/s-l225.webp","title":"New ListingLouis Tomlinson ‎– Walls - LP Vinyl Record - One Direction NEW SEALED","price":38.99,"category":"vinyls"},{"imgSrc":"https://i.ebayimg.com/thumbs/images/g/SlgAAOSwaiZgkpUY/s-l225.webp","title":"5 Vintage 12\" Vinyl LP's with sleeves - tested and working","price":30.6,"category":"vinyls"},{"imgSrc":"https://i.ebayimg.com/thumbs/images/g/OYwAAOSwzHZgkgwG/s-l225.webp","title":"New ListingDisney’s Merry Christmas Carols Vintage Vinyl LP Disney Records 2514","price":19.77,"category":"vinyls"},{"imgSrc":"https://i.ebayimg.com/thumbs/images/g/9IUAAOSw10tgk0ng/s-l225.webp","title":"New ListingDeep Purple-Perfect Strangers VINYL NEW","price":50.33,"category":"vinyls"},{"imgSrc":"https://i.ebayimg.com/thumbs/images/g/i2MAAOSwc~dgghZD/s-l225.webp","title":"Vinyl Rock LPs 1960s-70s $5 U Pick promos, first pressings, and more!","price":5,"category":"vinyls"},{"imgSrc":"https://i.ebayimg.com/thumbs/images/g/Ly4AAOSwMe1gkTLi/s-l225.webp","title":"New ListingCOASTERS SAME ATLANTIC P-4583A Japan OBI VINYL LP","price":3.99,"category":"vinyls"},{"imgSrc":"https://i.ebayimg.com/thumbs/images/g/WmQAAOSwS49giuMX/s-l225.webp","title":"ROACHFORD-ROACHFORD VINYL NEW","price":17.55,"category":"vinyls"},{"imgSrc":"https://i.ebayimg.com/thumbs/images/g/lCAAAOSwJapgkrJO/s-l225.webp","title":"JACK ASHFORD'S JUST PRODUCTIONS - New & Sealed Northern Soul LP Vinyl (Kent) 70s","price":30.59,"category":"vinyls"},{"imgSrc":"https://i.ebayimg.com/thumbs/images/g/TecAAOSw6ateumFI/s-l225.webp","title":"JOHN MAYER - Continuum [VINYL]","price":36.27,"category":"vinyls"},{"imgSrc":"https://i.ebayimg.com/thumbs/images/g/JEgAAOSw329gkTLg/s-l225.webp","title":"New ListingSURFARIS SURFIN' MCA VIM-4006 Japan PROMO VINYL LP","price":8.5,"category":"vinyls"},{"imgSrc":"https://i.ebayimg.com/thumbs/images/g/e0EAAOSwfHpgZKlL/s-l225.webp","title":"SMITH,ELLIOTT-NEW MOON VINYL LP NEW","price":33.88,"category":"vinyls"},{"imgSrc":"https://i.ebayimg.com/thumbs/images/g/RQ8AAOSwq5Ngkq53/s-l225.webp","title":"ROBERT JOHNSON - KING OF THE DELTA BLUES SINGERS NEW VINYL","price":31.77,"category":"vinyls"},{"imgSrc":"https://i.ebayimg.com/thumbs/images/g/vZMAAOSwQnpgk1H7/s-l225.webp","title":"New ListingGRATEFUL DEAD WORKINGMAN'S DEAD (VG) WS-1869 LP VINYL RECORD","price":19.99,"category":"vinyls"},{"imgSrc":"https://i.ebayimg.com/thumbs/images/g/aXMAAOSwcapgkbUn/s-l225.webp","title":"SUBLIME-ACOUSTIC: BRADLEY NOWELL & FRIENDS (US IMPORT) VINYL LP NEW","price":26.5,"category":"vinyls"},{"imgSrc":"https://i.ebayimg.com/thumbs/images/g/85MAAOSwcflgk3Xx/s-l225.webp","title":"New ListingThe Beatles 1967-1970 Blue Album Greatest Hits Vinyl Record LP Apple SKBO 3404 M","price":34.2,"category":"vinyls"},{"imgSrc":"https://i.ebayimg.com/thumbs/images/g/TD0AAOSwEOhf81J3/s-l225.webp","title":"Kid Rock GREATEST HITS: YOU NEVER SAW COMING Best Of 15 Songs NEW VINYL 2 LP","price":30.39,"category":"vinyls"},{"imgSrc":"https://i.ebayimg.com/thumbs/images/g/SlgAAOSwjglgk3FL/s-l225.webp","title":"New ListingCream - Fresh Cream (US Stereo Vinyl 70's Pressing)","price":11.63,"category":"vinyls"},{"imgSrc":"https://i.ebayimg.com/thumbs/images/g/WhkAAOSwfppgkwoK/s-l225.webp","title":"New ListingPJ Harvey Dry Vinyl LP New Sealed","price":34.76,"category":"vinyls"},{"imgSrc":"https://i.ebayimg.com/thumbs/images/g/mQwAAOSwh79a~fa3/s-l225.webp","title":"PEINE PERDUE - DISPARATIONS  VINYL LP NEW! ","price":49.12,"category":"vinyls"},{"imgSrc":"https://i.ebayimg.com/thumbs/images/g/ExEAAOSwTR9d2Fm9/s-l225.webp","title":"7\" Vinyl Single records Pick from 1200+ 60s 70s 80s90s £1.99each: Buy 7, 1 FREE!","price":2.77,"category":"vinyls"},{"imgSrc":"https://i.ebayimg.com/thumbs/images/g/iOUAAOSwajtgNd1v/s-l225.webp","title":"Nina Simone-Broadway, Blues, Ballads VINYL NEW","price":29.89,"category":"vinyls"},{"imgSrc":"https://i.ebayimg.com/thumbs/images/g/DLUAAOSwOXxgZKlK/s-l225.webp","title":"M.I.A.-Arular VINYL LP NEW","price":36.78,"category":"vinyls"},{"imgSrc":"https://i.ebayimg.com/thumbs/images/g/vmAAAOSwIC5gk~so/s-l225.webp","title":"New ListingDAVID BOWIE : SCARY MONSTERS : NEW & SEALED REMASTERED 180GRAM VINYL LP","price":31.98,"category":"vinyls"},{"imgSrc":"https://i.ebayimg.com/thumbs/images/g/QG4AAOSwD1Ngk-TA/s-l225.webp","title":"New ListingDAVID GILMOUR David Gilmour 1980's (Vinyl LP)","price":17.39,"category":"vinyls"},{"imgSrc":"https://i.ebayimg.com/thumbs/images/g/WP4AAOSwodlaqY5a/s-l225.webp","title":"Paul McCartney RAM 180g +MP3s LIMITED EDITION New Sealed YELLOW COLORED VINYL LP","price":33.24,"category":"vinyls"},{"imgSrc":"https://i.ebayimg.com/thumbs/images/g/jMUAAOSwG5teTfRD/s-l225.webp","title":"\"SHINDIG!!!\">12\" GUEST STAR VINYL RECORD ALBUM>VG+>1964","price":4.29,"category":"vinyls"},{"imgSrc":"https://i.ebayimg.com/thumbs/images/g/UdsAAOSwoZte86u7/s-l225.webp","title":"Ramones adios amigos lp vinyl new sealed insert sealed","price":36.02,"category":"vinyls"},{"imgSrc":"https://i.ebayimg.com/thumbs/images/g/1A8AAOSwiv9gFT9J/s-l225.webp","title":"HORROR - UNITED STATES OF HORROR - VINYL - NEW & SEALED","price":20.85,"category":"vinyls"},{"imgSrc":"https://i.ebayimg.com/thumbs/images/g/fCkAAOSwyFZgh9zo/s-l225.webp","title":"Motorpsycho-Trust Us (180 Gr./White Vinyl) (UK IMPORT) VINYL NEW","price":29.89,"category":"vinyls"},{"imgSrc":"https://i.ebayimg.com/thumbs/images/g/KxgAAOSw5Yhgk0oa/s-l225.webp","title":"New ListingColdplay-Parachutes Vinyl / 12\" Album NEW","price":32.83,"category":"vinyls"},{"imgSrc":"https://i.ebayimg.com/thumbs/images/g/5xgAAOSwBOlaXh5K/s-l225.webp","title":"CHUBBY CHECKER - LET'S LIMBO SOME MORE  7\" VINYL","price":6.25,"category":"vinyls"},{"imgSrc":"https://i.ebayimg.com/thumbs/images/g/bUAAAOSw7jtgk3PB/s-l225.webp","title":"New ListingMON LAFERTE Norma LP Vinyl Album 2019 MEXICO Universal NEW MINT SEALED","price":54,"category":"vinyls"},{"imgSrc":"https://i.ebayimg.com/thumbs/images/g/VxwAAOSw91BgiIRq/s-l225.webp","title":"RUMJACKS-SLEEPIN` ROUGH (GRN) (PURP) VINYL LP NEW","price":25.9,"category":"vinyls"},{"imgSrc":"https://i.ebayimg.com/thumbs/images/g/32UAAOSwZwRfSmJk/s-l225.webp","title":"UNKNOWN ARTIST ILLICIT GROOVES VOL 1 VINYL 12”","price":4.16,"category":"vinyls"},{"imgSrc":"https://i.ebayimg.com/thumbs/images/g/tLsAAOSwkJRgiYpv/s-l225.webp","title":"Etta James - Tell Mama (LP, 180gram Vinyl) - Vinyl Soul","price":26.05,"category":"vinyls"},{"imgSrc":"https://i.ebayimg.com/thumbs/images/g/oUQAAOSwOZRfL6xJ/s-l225.webp","title":"TREHA SEKTORI-SORIEH VINYL NEW","price":27.38,"category":"vinyls"},{"imgSrc":"https://i.ebayimg.com/thumbs/images/g/pC8AAOSw8ihcgcpf/s-l225.webp","title":"GOOD RIDDANCE ballads from the revolution GOLD VINYL w/ Black Splatter Lp Record","price":49.95,"category":"vinyls"},{"imgSrc":"https://i.ebayimg.com/thumbs/images/g/3CAAAOSwv4xf21mx/s-l225.webp","title":"Joey Badass - All-Amerikkkan Bada$$ - 2 x LP - NEW Vinyl Album - HIP HOP Record","price":49.99,"category":"vinyls"},{"imgSrc":"https://i.ebayimg.com/thumbs/images/g/XvcAAOSwecZgk6c0/s-l225.webp","title":"New ListingSURVIVOR TOO HOT TO SLEEP C25Y0380 with OBI LP Japan Vinyl","price":19.99,"category":"vinyls"},{"imgSrc":"https://i.ebayimg.com/thumbs/images/g/HiwAAOSwFwlf~M4K/s-l225.webp","title":"Transformers-Roll Out-Rare Limited Edition Picture Vinyl LP-Sony Music","price":24.95,"category":"vinyls"},{"imgSrc":"https://i.ebayimg.com/thumbs/images/g/NeUAAOSw9Rpe3Chj/s-l225.webp","title":"Suffocation - Human Waste LP - NEW Vinyl Album - CLASSIC Death Metal Record ","price":29.99,"category":"vinyls"},{"imgSrc":"https://i.ebayimg.com/thumbs/images/g/YOkAAOSw2XteGhQK/s-l225.webp","title":"System 7-Planet 7 VINYL NEW","price":9.46,"category":"vinyls"},{"imgSrc":"https://i.ebayimg.com/thumbs/images/g/6p0AAOSwAMVgkTLp/s-l225.webp","title":"New ListingSTEVE HACKETT HIGHLY STRUNG CHARISMA 25S-161 Japan VINYL LP","price":3.99,"category":"vinyls"},{"imgSrc":"https://i.ebayimg.com/thumbs/images/g/yiIAAOSwwmlcbeJT/s-l225.webp","title":"CLECKHUDDERSFAX - SPEN BECK  VINYL LP NEW!","price":32.32,"category":"vinyls"},{"imgSrc":"https://i.ebayimg.com/thumbs/images/g/aVEAAOSwMGVaeLfA/s-l225.webp","title":"TURTLE - COLOURS (LP)   VINYL LP NEW! ","price":80.52,"category":"vinyls"},{"imgSrc":"https://i.ebayimg.com/thumbs/images/g/HnQAAOSwmNNglA3k/s-l225.webp","title":"New ListingShalamar Circumstantial Evidence SEALED Vinyl LP Solar ST-72556 + Hype Sticker ","price":12.99,"category":"vinyls"},{"imgSrc":"https://i.ebayimg.com/thumbs/images/g/jKoAAOSwDj9glBDi/s-l225.webp","title":"New ListingELECTRIC LIGHT ORCHESTRA Discovery 1979 (Vinyl LP) ","price":13.84,"category":"vinyls"}];

  constructor(private httpClient: HttpClient) { }

  addItem(item: Item): void {
    this.items.push(item);
  }

  // deleteItem(index: number): void {
  //   this.items.splice(index,1);
  // }

  // getItems(): Item[] {
  //   return this.items; 
  // }

  // getItem(id: number): Item {
  //   return this.items[id];
  // }

  // editItem(item: Item, id: number): void {
  //   this.items[id] = item;
  // }

  // saveItemsToDatabase(items: Item[]) {
  //   return this.httpClient.put("https://java-04-2021-default-rtdb.europe-west1.firebasedatabase.app/items.json", items);
  // }
  // // PUT - asendab kõik ära mis andmebaasis juba on sellega mis ma kaasa PUT päringuga annan

  // addItemToDatabase(item: Item) {
  //   return this.httpClient.post("https://java-04-2021-default-rtdb.europe-west1.firebasedatabase.app/items.json", item);
  // }
  // // POST - lisab olemasolevale selle ühe juurde mida ma POST päringuga kaasa annan

  // getItemsFromDatabase() {
  //   return this.httpClient.get<Item[]>("https://java-04-2021-default-rtdb.europe-west1.firebasedatabase.app/items.json");
  // }


  addItemToDatabase(item: Item) {
    return this.httpClient.post("http://localhost:8080/add-item", item);
  }
  // POST - lisab olemasolevale selle ühe juurde mida ma POST päringuga kaasa annan

  getItemsFromDatabase() {
    return this.httpClient.get<Item[]>("http://localhost:8080/items");
  }
  
  editItem(item: Item): Observable<Object> {
    return this.httpClient.post("http://localhost:8080/edit-item", item);
  }

  getItem(id: number): Observable<Item> {
    return this.httpClient.get<Item>("http://localhost:8080/view-item/" + id);
  }

  deleteItem(id: number): Observable<Object> {
    return this.httpClient.delete<Item>("http://localhost:8080/delete-item/" + id);
  }

  // Observable - jälgitav, tehakse päring ära, siis .subscribe sisu läheb käima ja rohkem midagi ei toimu (1 kord, päring käib ära)
  // Subject - kuulatav, läheb iga kord käima kui .next toimub

  // mõlemad on asünkroonsed ehk kood läheb edasi ja nemad lähevad mingil hetkel lihtsalt käima
  
}
