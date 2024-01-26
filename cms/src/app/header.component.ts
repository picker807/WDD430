import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cms-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Output() selectedFeatureEvent: EventEmitter<string> = new EventEmitter();
  selectedFeature: string;

  onSelected(selectedFeature: string){
    this.selectedFeature = selectedFeature;
    this.selectedFeatureEvent.emit(selectedFeature);
  }
}
