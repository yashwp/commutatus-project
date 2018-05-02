import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunityProfileComponent } from './opportunity-profile.component';

describe('OpportunityProfileComponent', () => {
  let component: OpportunityProfileComponent;
  let fixture: ComponentFixture<OpportunityProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpportunityProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpportunityProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
