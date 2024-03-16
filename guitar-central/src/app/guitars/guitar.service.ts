import { Injectable, EventEmitter } from '@angular/core';
import { Guitar } from './guitar.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GuitarService {

  guitars: Guitar[] = [];
  maxGuitarId: number;
  guitarSelectedEvent: EventEmitter<Guitar> = new EventEmitter<Guitar>();
  guitarListChangedEvent = new Subject<Guitar []>();
  url: string = 'https://guitarcentral-cd585-default-rtdb.firebaseio.com/guitars.json';

  constructor(private http: HttpClient) { 
    this.maxGuitarId = this.getMaxId();
  }

  getGuitars(): void{
    this.http.get<Guitar[]>(this.url).subscribe(
      (guitars: Guitar[]) => {
        this.guitars = guitars;
        this.maxGuitarId = this.getMaxId();
        this.guitars.sort((a: Guitar, b: Guitar) => {
          if (a.brand <b.brand) {
            return -1;
          } else if (a.brand > b.brand) {
            return 1;
          } else {
            return 0;
          }
        });
        this.guitarListChangedEvent.next(this.guitars.slice());
      },
      (error: any) => {
        console.error(error);
      }
    );

  }

  storeGuitars(): void {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.http.put(this.url, JSON.stringify(this.guitars), { headers: headers })
      .subscribe(() => {
        this.guitarListChangedEvent.next(this.guitars.slice());
      });
  }

  getGuitar(id: string): Guitar | null{
    for (const guitar of this.guitars){
      if (guitar.id === id) {
        return guitar;
      }
    }
    return null;
  }

  getMaxId(): number {
    let maxId = 0;
      this.guitars.forEach(guitar => {
        const currentId = +guitar.id;
        if (currentId > maxId) {
          maxId = currentId;
        }
      });
      return maxId;
  }
  
    addGuitar(newGuitar: Guitar): void {
      if (newGuitar === undefined || newGuitar === null) {
        return;
      }
  
      this.maxGuitarId++;
      newGuitar.id = this.maxGuitarId.toString();
      this.guitars.push(newGuitar);
  
      this.storeGuitars();
    }
  
    updateGuitar(originalGuitar: Guitar, newGuitar: Guitar): void {
      if (originalGuitar === undefined || originalGuitar === null || newGuitar === undefined || newGuitar === null) {
        return;
      }
  
      const pos = this.guitars.indexOf(originalGuitar);
      if (pos < 0) {
        return;
      }
  
      newGuitar.id = originalGuitar.id;
      this.guitars[pos] = newGuitar;
  
      this.storeGuitars();
    }
  
    deleteGuitar(guitar: Guitar): void {
      if (guitar === undefined || guitar === null) {
        return;
      }
  
      const pos = this.guitars.indexOf(guitar);
      if (pos < 0) {
        return;
      }
  
      this.guitars.splice(pos, 1);
      this.storeGuitars();
    }
}

