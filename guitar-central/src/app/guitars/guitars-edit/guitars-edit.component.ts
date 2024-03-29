import { Component, OnInit } from '@angular/core';
import { Guitar } from '../guitar.model';
import { NgForm } from '@angular/forms';
import { GuitarService } from '../guitar.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'gc-guitars-edit',
  templateUrl: './guitars-edit.component.html',
  styleUrl: './guitars-edit.component.css'
})
export class GuitarsEditComponent implements OnInit{

    originalGuitar: Guitar;
    editMode: boolean = false;
    id: string;
    guitar: Guitar;

    constructor(
      private guitarService: GuitarService,
      private router: Router,
      private route: ActivatedRoute) {
      }

    ngOnInit(){
      this.route.params.subscribe(params => {
        const id = params['id'];
        if (id === undefined || id === null) {
          this.editMode = false;
          this.guitar = {
            id: '',
            brand: '',
            model: '',
            year: null,
            price: null,
            description: '',
            category: '',
            condition: '',
            image: ''
          };
          return;
        }
          
        this.originalGuitar = this.guitarService.getGuitar(id);
        if (!this.originalGuitar) {
          return;
        }
  
        this.editMode = true;
        this.guitar = JSON.parse(JSON.stringify(this.originalGuitar)); 
      });
    }

    onCancel(){
      this.router.navigate(['/inventory']);
    }

    onSubmit(form: NgForm){
      const value = form.value;
      const newGuitar = new Guitar(
        "", 
        value.brand, 
        value.model, 
        value.year, 
        value.price, 
        value.description,
        value.category,
        value.condition,
        value.imageUrl,
      );
  
      if (this.editMode) {
        this.guitarService.updateGuitar(this.originalGuitar, newGuitar);
      } else {
        this.guitarService.addGuitar(newGuitar);
      }
  
      this.router.navigate(['/inventory']);
    }
}
