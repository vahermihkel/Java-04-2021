import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[autosize]'
})
export class AutosizeDirective {

  constructor(public element: ElementRef) { 
  }

  //  @HostListener('mouseover') 
  //  extend() {
  //    this.element.nativeElement.style.width = "400px"
  //  }

  //  @HostListener('mouseleave') 
  //  heighten() {
  //    this.element.nativeElement.style.height = "400px"
  //  }

  //  @HostListener('blur') 
  //  color() {
  //    this.element.nativeElement.style.color = "red"
  //  }

  @HostListener('input', ['$event.target'])
  adjust() {
    let elementRef = this.element.nativeElement;
    elementRef.style.overflow = 'hidden';
    elementRef.style.height = 'auto';
    elementRef.style.height = elementRef.scrollHeight + 'px';
  }

}
