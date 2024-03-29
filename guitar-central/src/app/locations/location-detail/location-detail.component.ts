import { Component, Input, OnInit } from '@angular/core';
import { Location } from '../location.model';
import { Guitar } from '../../guitars/guitar.model';
import { LocationService } from '../location.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'gc-location-detail',
  templateUrl: './location-detail.component.html',
  styleUrl: './location-detail.component.css'
})
export class LocationDetailComponent implements OnInit {
  @Input() public location: Location;
  guitarsList: Guitar[] = [];

  constructor(
    private locationService: LocationService,
    private router: Router,
    private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.location = this.locationService.getLocation(id);
      }
    });
  }

  onDelete(){
    this.locationService.deleteLocation(this.location);
    this.router.navigateByUrl('/locations');
  }

}
