import { Injectable, EventEmitter } from '@angular/core';
import { Guitar } from './guitar.model';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GuitarService {

  guitars: Guitar[] = [];
  guitarSelectedEvent: EventEmitter<Guitar> = new EventEmitter<Guitar>();
  guitarListChangedEvent = new Subject<Guitar []>();
  url: string = 'http://localhost:3000/inventory';

  constructor(private http: HttpClient) {}

  getGuitars(): void{
    this.http.get<Guitar[]>(this.url).subscribe(
      (guitars: Guitar[]) => {
        this.guitars = guitars;
        this.sortAndSend();
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  sortAndSend(): void {
    this.guitars.sort((a: Guitar, b: Guitar) => {
      // First, compare by brand
      if (a.brand.toLowerCase() < b.brand.toLowerCase()) {
        return -1;
      } else if (a.brand.toLowerCase() > b.brand.toLowerCase()) {
        return 1;
      } else {
        // If brands are equal, then compare by model
        if (a.model.toLowerCase() < b.model.toLowerCase()) {
          return -1;
        } else if (a.model.toLowerCase() > b.model.toLowerCase()) {
          return 1;
        } else {
          // If both brand and model are equal
          return 0;
        }
      }
    });
    this.guitarListChangedEvent.next(this.guitars.slice());
  }

  getGuitar(id: string): Guitar | null{
    for (const guitar of this.guitars){
      if (guitar.id === id) {
        return guitar;
      }
    }
    return null;
  }
  
    addGuitar(newGuitar: Guitar): Observable<any> {
      if (newGuitar === undefined || newGuitar === null) {
        return;
      }
  
      newGuitar.id = '';
      const headers = new HttpHeaders({'Content-Type': 'application/json'});
  
      return this.http.post<{ message: string, guitar: Guitar }>(this.url, newGuitar, { headers: headers })
      .pipe(
        tap({
        next: (responseData) => {
          console.log(responseData);
          this.guitars.push(responseData.guitar);
          this.sortAndSend();
        },
        error: (error) => {
          console.error('Error adding location', error);
        }
      })
      )
  }
  
    updateGuitar(originalGuitar: Guitar, newGuitar: Guitar): Observable<any> {
      if (originalGuitar === undefined || originalGuitar === null || newGuitar === undefined || newGuitar === null) {
        return;
      }
  
      const pos = this.guitars.indexOf(originalGuitar);
      if (pos < 0) {
        return;
      }
  
      newGuitar.id = originalGuitar.id;
      const headers = new HttpHeaders({'Content-Type': 'application/json'});
      // update database
      return this.http.put(this.url + '/' + originalGuitar.id,
      newGuitar, { headers: headers })
      .pipe(
        tap({
          next: (response: Response) => {
              this.guitars[pos] = newGuitar;
              this.sortAndSend();
           }
      }));
    }
  
    deleteGuitar(guitar: Guitar): void {
      if (guitar === undefined || guitar === null) {
        return;
      }
  
      const pos = this.guitars.indexOf(guitar);
      if (pos < 0) {
        return;
      }
  
      this.http.delete(this.url + '/' + guitar.id)
      .subscribe(
        (response: Response) => {
          this.guitars.splice(pos, 1);
          this.sortAndSend();
        }
      )
      
    }
}

