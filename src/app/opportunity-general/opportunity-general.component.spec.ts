import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunityGeneralComponent } from './opportunity-general.component';

describe('OpportunityGeneralComponent', () => {
  let component: OpportunityGeneralComponent;
  let fixture: ComponentFixture<OpportunityGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpportunityGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpportunityGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
