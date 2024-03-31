import { Component, OnInit } from '@angular/core';
import { Location } from '../location.model';
import { Guitar } from '../../guitars/guitar.model';
import { NgForm } from '@angular/forms';
import { LocationService } from '../location.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'gc-location-edit',
  templateUrl: './location-edit.component.html',
  styleUrls: ['./location-edit.component.css']
})
export class LocationEditComponent implements OnInit {

  originalLocation: Location;
  editMode: boolean = false;
  id: string;
  guitarList: Guitar[] = [];
  location: Location;

  constructor(
    private locationService: LocationService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id === undefined || id === null) {
        this.editMode = false;
        this.location = {
          id: null,
          storeName: "",
          address: '', 
          city: '', 
          state: '', 
          zipCode: '', 
          inventory: [] 
        };
        return;
      }

      this.originalLocation = this.locationService.getLocation(id);
      if (this.originalLocation === undefined || this.originalLocation === null) {
        return;
      }

      this.editMode = true;
      this.location = JSON.parse(JSON.stringify(this.originalLocation));

      if (this.originalLocation.inventory && this.originalLocation.inventory.length > 0) {
        this.guitarList = JSON.parse(JSON.stringify(this.originalLocation.inventory));
      }
    });
  }

  onDrop(event: CdkDragDrop<Guitar[]>) {
    if (event.previousContainer !== event.container) {
      const guitarCopy = { ...event.item.data };
      this.guitarList.push(guitarCopy);
    }
  }

  onCancel() {
    this.router.navigate(['/locations', this.originalLocation.id]);
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newLocation = {
      ...this.location, 
      storeName: value.storeName,
      address: value.address,
      city: value.city,
      state: value.state,
      zipCode: value.zipCode,
      inventory: this.guitarList
    };

    if (this.editMode) {
      this.locationService.updateLocation(this.originalLocation, newLocation)
      .subscribe((response => {
        this.router.navigate(['/locations', this.originalLocation.id]);
      }));
    } else {
      this.locationService.addLocation(newLocation).subscribe(
        (response) => {
          const newId = response.location.id;
          this.router.navigate(['/locations', newId]);
        }
      );
    }

    
  }

  onRemoveItem(index: number) {
    if (index < 0 || index >= this.guitarList.length) {
      return;
    }
    this.guitarList.splice(index, 1);
  }
}