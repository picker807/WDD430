import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuitarsListComponent } from './guitars-list.component';

describe('GuitarsListComponent', () => {
  let component: GuitarsListComponent;
  let fixture: ComponentFixture<GuitarsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuitarsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GuitarsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
