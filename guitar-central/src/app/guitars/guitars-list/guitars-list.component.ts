import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Guitar } from '../guitar.model';
import { GuitarService } from '../guitar.service';
import { Subscription } from 'rxjs';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'gc-guitars-list',
  templateUrl: './guitars-list.component.html',
  styleUrl: './guitars-list.component.css'
})
export class GuitarsListComponent implements OnInit, OnDestroy {
  @Input() isInventory: Boolean = true; //Used to change styling depending on where the list is used.
  guitars: Guitar[] = [];
  subscription: Subscription;
  term: string;

  constructor(private guitarService: GuitarService) {}

  ngOnInit(): void {
    this.guitarService.getGuitars();

    this.subscription = this.guitarService.guitarListChangedEvent.subscribe((guitarsList: Guitar[]) => {
      this.guitars = guitarsList;
    });
    
} 

search(value: string){
  this.term = value;
}

ngOnDestroy(): void {
  this.subscription.unsubscribe();

}

}
