import { Pipe, PipeTransform } from '@angular/core';
import { Location } from './location.model';

@Pipe({
  name: 'locationFilter'
})
export class LocationFilterPipe implements PipeTransform {
  transform(locations: Location[], selectedState: string): Location[] {
    if (!selectedState) {
      return locations; // If no state is selected, return all locations
    }
    return locations.filter(location => location.state === selectedState);
  }
}