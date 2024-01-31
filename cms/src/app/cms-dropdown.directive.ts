import { Directive, ElementRef, Renderer2, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[cmsDropdown]'
})
export class CmsDropdownDirective {
  @HostBinding('class.open') isOpen= false;

  @HostListener('document:click', ['$event']) toggleOpen(event: Event) 
  {
    this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
  }
  constructor(private elRef: ElementRef) {}
}
  
