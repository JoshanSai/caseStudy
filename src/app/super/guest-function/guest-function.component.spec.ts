import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestFunctionComponent } from './guest-function.component';

describe('GuestFunctionComponent', () => {
  let component: GuestFunctionComponent;
  let fixture: ComponentFixture<GuestFunctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuestFunctionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuestFunctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
