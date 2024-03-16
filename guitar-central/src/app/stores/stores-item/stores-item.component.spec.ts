import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoresItemComponent } from './stores-item.component';

describe('StoresItemComponent', () => {
  let component: StoresItemComponent;
  let fixture: ComponentFixture<StoresItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoresItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StoresItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
