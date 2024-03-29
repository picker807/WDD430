import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { GuitarsComponent } from './guitars/guitars.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { GuitarItemComponent } from './guitars/guitar-item/guitar-item.component';
import { GuitarsDetailComponent } from './guitars/guitars-detail/guitars-detail.component';
import { GuitarsEditComponent } from './guitars/guitars-edit/guitars-edit.component';
import { GuitarsListComponent } from './guitars/guitars-list/guitars-list.component';
import { GuitarsFilterPipe } from './guitars/guitars-filter.pipe';
import { HttpClientModule } from '@angular/common/http';
import { LocationsComponent } from './locations/locations.component';
import { LocationListComponent } from './locations/location-list/location-list.component';
import { LocationDetailComponent } from './locations/location-detail/location-detail.component';
import { LocationItemComponent } from './locations/location-item/location-item.component';
import { LocationEditComponent } from './locations/location-edit/location-edit.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { LocationFilterPipe } from './locations/location-filter.pipe';
import { LocationEditWrapperComponent } from './locations/location-edit-wrapper/location-edit-wrapper.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GuitarsComponent,
    GuitarsListComponent,
    GuitarsEditComponent,
    GuitarsDetailComponent,
    GuitarItemComponent,
    GuitarsFilterPipe,
    LocationsComponent,
    LocationDetailComponent,
    LocationListComponent,
    LocationItemComponent,
    LocationEditComponent,
    LocationFilterPipe,
    LocationEditWrapperComponent
    // List other components here
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    DragDropModule,
    HttpClientModule

    // Other modules here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { } 