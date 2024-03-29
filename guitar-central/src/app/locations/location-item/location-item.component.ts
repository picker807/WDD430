import { Component,Input } from '@angular/core';
import { Location } from '../location.model';

@Component({
  selector: 'gc-location-item',
  templateUrl: './location-item.component.html',
  styleUrl: './location-item.component.css'
})
export class LocationItemComponent {
@Input() location: Location;
}
