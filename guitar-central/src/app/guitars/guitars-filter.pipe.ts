import { Pipe, PipeTransform } from '@angular/core';
import { Guitar } from './guitar.model';

@Pipe({
  name: 'guitarsFilter'
})
export class GuitarsFilterPipe implements PipeTransform {
  transform(guitars: Guitar[], term: string): Guitar[] {
    if(!term) {
      return guitars;
    }
    const filteredGuitars: Guitar[] = [];
  
    for (const guitar of guitars) {
      if (guitar.brand.toLowerCase().includes(term.toLowerCase())
          || guitar.model.toLowerCase().includes(term.toLowerCase())) {
        filteredGuitars.push(guitar);
      }
    }
  
    if (filteredGuitars.length === 0) {
      return guitars;
    }
  
    return filteredGuitars;
  }

}
