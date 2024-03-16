import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { GuitarsComponent } from './guitars/guitars.component';
import { StoresComponent } from './stores/stores.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { GuitarItemComponent } from './guitars/guitar-item/guitar-item.component';
import { GuitarsDetailComponent } from './guitars/guitars-detail/guitars-detail.component';
import { GuitarsEditComponent } from './guitars/guitars-edit/guitars-edit.component';
import { GuitarsListComponent } from './guitars/guitars-list/guitars-list.component';
import { StoresDetailComponent } from './stores/stores-detail/stores-detail.component';
import { StoresItemComponent } from './stores/stores-item/stores-item.component';
import { StoresListComponent } from './stores/stores-list/stores-list.component';
import { GuitarsFilterPipe } from './guitars/guitars-filter.pipe';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GuitarsComponent,
    StoresComponent,
    GuitarsListComponent,
    GuitarsEditComponent,
    GuitarsDetailComponent,
    GuitarItemComponent,
    StoresDetailComponent,
    StoresItemComponent,
    StoresListComponent,
    GuitarsFilterPipe
    // List other components here
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule

    // Other modules here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { } 