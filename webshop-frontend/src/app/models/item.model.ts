export class Item {
  constructor(
    public title: string,
    public price: number,
    public imgSrc: string,
    public category: string
    ) {}
}

// {title: string, price: number, imgSrc: string, category: string}[]
// Item[]

// 1. Kui lisan, siis lisan kõigile korraga - (description: string lisatakse juurde)
// 2. Pikk rivi (20 rida), siis on kas liiga lai või liiga ülevalt alla
// 3. Esimesest pilgust saan aru, et tegemist on sama asjaga
