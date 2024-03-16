import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { GuitarsComponent } from './guitars/guitars.component';
import { GuitarsEditComponent } from './guitars/guitars-edit/guitars-edit.component';
import { GuitarsDetailComponent } from './guitars/guitars-detail/guitars-detail.component';
import { StoresComponent } from './stores/stores.component';
import { StoresDetailComponent } from './stores/stores-detail/stores-detail.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/inventory', pathMatch: 'full' },
  { path: 'inventory', component: GuitarsComponent, children: [
    {path: 'new', component: GuitarsEditComponent},
    {path: ':id', component: GuitarsDetailComponent},
    {path: ':id/edit', component: GuitarsEditComponent}
  ] },
  { path: 'locations', component: StoresComponent, children: [
    {path: ':id', component: StoresDetailComponent},
  ] }
]


@NgModule({
  imports:[RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
