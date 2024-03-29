import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { GuitarsComponent } from './guitars/guitars.component';
import { GuitarsEditComponent } from './guitars/guitars-edit/guitars-edit.component';
import { GuitarsDetailComponent } from './guitars/guitars-detail/guitars-detail.component';
import { LocationDetailComponent } from './locations/location-detail/location-detail.component';
import { LocationsComponent } from './locations/locations.component';
import { LocationEditComponent } from './locations/location-edit/location-edit.component';
import { LocationEditWrapperComponent } from './locations/location-edit-wrapper/location-edit-wrapper.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/inventory', pathMatch: 'full' },
  { path: 'inventory', component: GuitarsComponent, children: [
    {path: 'new', component: GuitarsEditComponent},
    {path: ':id', component: GuitarsDetailComponent},
    {path: ':id/edit', component: GuitarsEditComponent}
  ] },
  { path: 'locations', component: LocationsComponent, children: [
    {path: 'new', component: LocationEditWrapperComponent},
    {path: ':id', component: LocationDetailComponent},
    {path: ':id/edit', component: LocationEditWrapperComponent}
  ] }
]


@NgModule({
  imports:[RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
