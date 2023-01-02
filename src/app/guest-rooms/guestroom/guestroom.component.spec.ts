  import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestroomComponent } from './guestroom.component';

describe('GuestroomComponent', () => {
  let component: GuestroomComponent;
  let fixture: ComponentFixture<GuestroomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuestroomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuestroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
