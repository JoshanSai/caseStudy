import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseCommunityComponent } from './choose-community.component';

describe('ChooseCommunityComponent', () => {
  let component: ChooseCommunityComponent;
  let fixture: ComponentFixture<ChooseCommunityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseCommunityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChooseCommunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
