import { Component, Input } from '@angular/core';
import { Guitar } from '../guitar.model';

@Component({
  selector: 'gc-guitar-item',
  templateUrl: './guitar-item.component.html',
  styleUrl: './guitar-item.component.css'
})
export class GuitarItemComponent {
  @Input() guitar: Guitar;
}
