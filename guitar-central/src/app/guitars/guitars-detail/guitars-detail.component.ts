import { Component, Input } from '@angular/core';
import { Guitar } from '../guitar.model';
import { GuitarService } from '../guitar.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'gc-guitars-detail',
  templateUrl: './guitars-detail.component.html',
  styleUrl: './guitars-detail.component.css'
})
export class GuitarsDetailComponent {
  @Input() public guitar: Guitar;

  constructor(private guitarService: GuitarService,
    private router: Router,
    private route: ActivatedRoute){}

    ngOnInit(): void {
      this.route.params.subscribe(params => {
        const id = params['id'];
        if (id) {
          this.guitar = this.guitarService.getGuitar(id);
        };
        });
      }

      onDelete(){
        this.guitarService.deleteGuitar(this.guitar);
        this.router.navigateByUrl('/inventory');
      }
}
