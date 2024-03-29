import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '../location.model';
import { LocationService } from '../location.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'gc-location-list',
  templateUrl: './location-list.component.html',
  styleUrl: './location-list.component.css'
})
export class LocationListComponent implements OnInit {
  locations: Location[] = [];
  subscription: Subscription;
  state: string;
  uniqueStates: string[] = [];
  selectedState: string = '';

  constructor (private locationService: LocationService){}

  ngOnInit(): void {
    this.locationService.getLocations();
   
    this.subscription = this.locationService.locationListChangedEvent.subscribe((locationList: Location[]) => {
      this.locations = locationList;
      this.populateUniqueStates();
    });
  }

  populateUniqueStates(): void {
    const states = this.locations.map(location => location.state);
    this.uniqueStates = Array.from(new Set(states));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}