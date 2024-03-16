import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuitarsEditComponent } from './guitars-edit.component';

describe('GuitarsEditComponent', () => {
  let component: GuitarsEditComponent;
  let fixture: ComponentFixture<GuitarsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuitarsEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GuitarsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
