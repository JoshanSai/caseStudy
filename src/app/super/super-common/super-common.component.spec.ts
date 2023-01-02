import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperCommonComponent } from './super-common.component';

describe('SuperCommonComponent', () => {
  let component: SuperCommonComponent;
  let fixture: ComponentFixture<SuperCommonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperCommonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
