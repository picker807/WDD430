import { Injectable, EventEmitter } from '@angular/core';
import { Location } from './location.model';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  locations: Location[] = [];
  locationSelectedEvent: EventEmitter<Location> = new EventEmitter<Location>();
  locationListChangedEvent = new Subject<Location []>();
  url: string = 'http://localhost:3000/locations';

  constructor(private http: HttpClient) { 
  
  }

  // get all locations
  getLocations(): void{
    this.http.get<Location[]>(this.url).subscribe(
      (locations: Location[]) => {
        this.locations = locations;
        this.sortAndSend();
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  sortAndSend(): void {
    this.locations.sort((a: Location, b: Location) => {
      // First, compare by state
      if (a.state.toLowerCase() < b.state.toLowerCase()) {
        return -1;
      } else if (a.state.toLowerCase() > b.state.toLowerCase()) {
        return 1;
      } else {
        // If states are equal, then compare by city
        if (a.city.toLowerCase() < b.city.toLowerCase()) {
          return -1;
        } else if (a.city.toLowerCase() > b.city.toLowerCase()) {
          return 1;
        } else {
          // If both state and city are equal
          return 0;
        }
      }
    });
    this.locationListChangedEvent.next(this.locations.slice());
  }

  getLocation(id: string): Location | null {
    for (const location of this.locations) {
      if (location.id === id) {
        return location;
      }
    }
    return null;
  }
  
  addLocation(newLocation: Location): Observable<any> {
    if (newLocation === undefined || newLocation === null) {
      return;
    }
    newLocation.id = '';
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
  
    return this.http.post<{ message: string, location: Location }>(this.url, newLocation, { headers: headers })
    .pipe(
      tap({
        next: (responseData) => {
          console.log(responseData);
          this.locations.push(responseData.location);
          this.sortAndSend();
        },
        error: (error) => {
          console.error('Error adding location', error);
        }
      })
    );
  }
  
  updateLocation(originalLocation: Location, newLocation: Location): Observable<any> {
    if (originalLocation === undefined || originalLocation === null || newLocation === undefined || newLocation === null) {
      return;
    }
    const pos = this.locations.indexOf(originalLocation);
    if (pos < 0) {
      return;
    }

    newLocation.id = originalLocation.id;
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    // update database
    return this.http.put(this.url + '/' + originalLocation.id,
    newLocation, { headers: headers })
    .pipe(
      tap({
        next: (response: Response) => {
          this.locations[pos] = newLocation;
          this.sortAndSend();
      }
      }));
    }
  
    deleteLocation(location: Location): void {
      if (location === undefined || location === null) {
        return;
      }
  
      const pos = this.locations.indexOf(location);
      if (pos < 0) {
        return;
      }
      
      this.http.delete(this.url + '/' + location.id)
      .subscribe(
        (response: Response) => {
          this.locations.splice(pos, 1);
          this.sortAndSend();
        }
      )
      
    }
}