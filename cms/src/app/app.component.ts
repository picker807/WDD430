import { Component } from '@angular/core';

@Component({
  selector: 'cms-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  selectedFeature: string = "documents";
  title = 'cms';

  switchView(selectedFeature: string){
    this.selectedFeature = selectedFeature;
  }
}
