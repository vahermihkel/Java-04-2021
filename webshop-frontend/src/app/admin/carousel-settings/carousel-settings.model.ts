export class CarouselSettings {
  constructor(
    public interval: number,
    public wrap: boolean,
    public keyboard: boolean,
    public pauseOnHover: boolean,
    public showNavigationArrows: boolean,
    public showNavigationIndicators: boolean,
  ) {}
}