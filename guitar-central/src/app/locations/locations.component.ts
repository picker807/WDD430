import { Component, OnInit } from '@angular/core';
import { Location } from './location.model';
import { LocationService } from './location.service';

@Component({
  selector: 'gc-locations',
  templateUrl: './locations.component.html',
  styleUrl: './locations.component.css'
})
export class LocationsComponent implements OnInit {
  selectedLocation: Location = null;

  constructor(private locationService: LocationService){}

  ngOnInit(): void {
    this.locationService.locationSelectedEvent.subscribe((location: Location) => {
      this.selectedLocation = location;
    });
  }

}
