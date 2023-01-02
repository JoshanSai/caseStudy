import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityExpendituresComponent } from './community-expenditures.component';

describe('CommunityExpendituresComponent', () => {
  let component: CommunityExpendituresComponent;
  let fixture: ComponentFixture<CommunityExpendituresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommunityExpendituresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommunityExpendituresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
