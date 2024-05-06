import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptBidsComponent } from './accept-bids.component';

describe('AcceptBidsComponent', () => {
  let component: AcceptBidsComponent;
  let fixture: ComponentFixture<AcceptBidsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AcceptBidsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AcceptBidsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
