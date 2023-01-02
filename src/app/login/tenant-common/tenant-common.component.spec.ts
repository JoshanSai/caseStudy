import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantCommonComponent } from './tenant-common.component';

describe('TenantCommonComponent', () => {
  let component: TenantCommonComponent;
  let fixture: ComponentFixture<TenantCommonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TenantCommonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TenantCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
